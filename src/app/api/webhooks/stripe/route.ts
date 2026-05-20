import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { generateOrderNumber } from "@/lib/utils";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await handleCheckoutComplete(session);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  try {
    const metadata = session.metadata;
    if (!metadata?.cartItems) return;

    const cartItems = JSON.parse(metadata.cartItems) as Array<{
      productId: string; variantId: string; quantity: number;
      price: number; name: string; image: string; size: string; color: string;
    }>;

    // shipping_details is available on checkout sessions
  const shippingAddress = (session as unknown as { shipping_details?: { name?: string; address?: { line1?: string; line2?: string; city?: string; state?: string; postal_code?: string; country?: string } } }).shipping_details;
    const subtotal = (session.amount_subtotal ?? 0) / 100;
    const total = (session.amount_total ?? 0) / 100;
    const tax = (session.total_details?.amount_tax ?? 0) / 100;
    const shippingCost = (session.total_details?.amount_shipping ?? 0) / 100;
    const discount = (session.total_details?.amount_discount ?? 0) / 100;

    const userId = metadata.userId;
    let resolvedUserId = userId;

    if (userId === "guest" && session.customer_email) {
      const existing = await prisma.user.findUnique({ where: { email: session.customer_email } });
      if (existing) resolvedUserId = existing.id;
      else {
        const newUser = await prisma.user.create({
          data: { email: session.customer_email, name: shippingAddress?.name ?? null },
        });
        resolvedUserId = newUser.id;
      }
    }

    const order = await prisma.order.create({
      data: {
        userId: resolvedUserId,
        orderNumber: generateOrderNumber(),
        status: "PAID",
        subtotal,
        shippingCost,
        tax,
        discount,
        total,
        currency: "CAD",
        stripeSessionId: session.id,
        stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
        couponCode: metadata.couponCode || null,
        shippingAddress: {
          fullName: shippingAddress?.name ?? "",
          streetAddress: shippingAddress?.address?.line1 ?? "",
          addressLine2: shippingAddress?.address?.line2 ?? null,
          city: shippingAddress?.address?.city ?? "",
          province: shippingAddress?.address?.state ?? "",
          postalCode: shippingAddress?.address?.postal_code ?? "",
          country: shippingAddress?.address?.country ?? "CA",
        },
        items: {
          create: cartItems.map((item) => ({
            productVariantId: item.variantId !== item.productId ? item.variantId : null,
            productId: item.productId,
            productName: item.name,
            productImage: item.image,
            size: item.size || null,
            color: item.color || null,
            quantity: item.quantity,
            priceAtPurchase: item.price,
          })),
        },
      },
    });

    // Decrement stock
    for (const item of cartItems) {
      if (item.variantId !== item.productId) {
        await prisma.productVariant.updateMany({
          where: { id: item.variantId },
          data: { stockQuantity: { decrement: item.quantity } },
        });
      }
    }

    // Clear cart if user exists
    if (resolvedUserId !== "guest") {
      await prisma.cart.deleteMany({ where: { userId: resolvedUserId } });
    }

    // Send confirmation email
    await sendOrderConfirmation(order.id);

  } catch (error) {
    console.error("handleCheckoutComplete error:", error);
  }
}

async function sendOrderConfirmation(orderId: string) {
  try {
    const { resend, FROM_EMAIL, SUPPORT_EMAIL } = await import("@/lib/resend");
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true, user: true },
    });
    if (!order || !order.user.email) return;

    const shippingAddr = order.shippingAddress as {
      fullName?: string; streetAddress?: string; addressLine2?: string;
      city?: string; province?: string; postalCode?: string; country?: string;
    } | null;

    const itemsHtml = order.items.map((i) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #E8E0D8;font-size:14px;color:#1A1410">${i.productName}${i.size ? ` — ${i.size}` : ""}${i.color ? ` / ${i.color}` : ""}</td>
        <td style="padding:10px 0;border-bottom:1px solid #E8E0D8;font-size:14px;color:#1A1410;text-align:center">×${i.quantity}</td>
        <td style="padding:10px 0;border-bottom:1px solid #E8E0D8;font-size:14px;color:#1A1410;text-align:right">$${(Number(i.priceAtPurchase) * i.quantity).toFixed(2)}</td>
      </tr>
    `).join("");

    // 1. Send confirmation to customer
    await resend.emails.send({
      from: FROM_EMAIL,
      to: order.user.email,
      subject: `Order Confirmed — ${order.orderNumber}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#2A2A2A">
          <div style="background:#1A1410;padding:32px;text-align:center">
            <h1 style="color:white;font-family:Georgia,serif;margin:0;font-size:28px">Khwab</h1>
            <p style="color:#F7F3EE;margin:8px 0 0;font-size:12px;letter-spacing:0.2em;text-transform:uppercase">Home Textiles</p>
          </div>
          <div style="padding:32px">
            <h2 style="color:#1A1410;font-family:Georgia,serif">Thank you for your order!</h2>
            <p>Hi ${order.user.name ?? "there"},</p>
            <p>Your order <strong>${order.orderNumber}</strong> has been confirmed. We&apos;ll email you when it ships.</p>
            <div style="background:#FAF7F2;border-radius:12px;padding:20px;margin:24px 0">
              <h3 style="color:#1A1410;margin:0 0 12px;font-family:Georgia,serif">Order Summary</h3>
              <table width="100%" cellpadding="0" cellspacing="0">${itemsHtml}</table>
              <div style="display:flex;justify-content:space-between;padding:12px 0;font-weight:600;font-size:16px;color:#1A1410">
                <span>Total</span>
                <span>$${Number(order.total).toFixed(2)} CAD</span>
              </div>
            </div>
            <p style="text-align:center">
              <a href="${process.env.NEXTAUTH_URL}/account/orders/${order.id}"
                style="display:inline-block;padding:12px 28px;background:#1A1410;color:white;border-radius:8px;text-decoration:none;font-size:14px">
                View Order
              </a>
            </p>
          </div>
          <div style="background:#D4C5B0;padding:20px;text-align:center;color:#2A2A2A;font-size:12px">
            <p>Questions? Email us at <a href="mailto:admin@khawabhome.com" style="color:#1A1410">admin@khawabhome.com</a></p>
            <p style="margin:4px 0 0">© ${new Date().getFullYear()} Khwab Home Textiles. Canadian Made.</p>
          </div>
        </div>
      `,
    });

    // 2. Send admin notification to store owner
    await resend.emails.send({
      from: FROM_EMAIL,
      to: SUPPORT_EMAIL,
      subject: `🛍️ New Order ${order.orderNumber} — $${Number(order.total).toFixed(2)} CAD`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1A1410;background:#F9F7F4;padding:32px">
          <h2 style="font-family:Georgia,serif;margin:0 0 4px">New Order Received</h2>
          <p style="margin:0 0 24px;color:#5A554F;font-size:14px">${new Date().toLocaleString("en-CA", { timeZone: "America/Toronto" })}</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="background:white;border:1px solid #E2DDD7;margin-bottom:20px">
            <tr style="background:#1A2B20">
              <td colspan="3" style="padding:12px 16px;color:white;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;font-weight:600">
                Order ${order.orderNumber}
              </td>
            </tr>
            ${itemsHtml}
            <tr>
              <td colspan="2" style="padding:12px 16px;font-weight:600;font-size:15px">Total</td>
              <td style="padding:12px 16px;font-weight:700;font-size:15px;text-align:right;color:#2C4A35">$${Number(order.total).toFixed(2)} CAD</td>
            </tr>
          </table>

          <table width="100%" cellpadding="0" cellspacing="0" style="background:white;border:1px solid #E2DDD7;margin-bottom:20px">
            <tr style="background:#F4F0EB">
              <td colspan="2" style="padding:10px 16px;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;font-weight:600;color:#5A554F">Customer</td>
            </tr>
            <tr>
              <td style="padding:10px 16px;font-size:14px;color:#5A554F;width:120px">Name</td>
              <td style="padding:10px 16px;font-size:14px;color:#1A1410;font-weight:500">${order.user.name ?? "—"}</td>
            </tr>
            <tr style="background:#FAF7F2">
              <td style="padding:10px 16px;font-size:14px;color:#5A554F">Email</td>
              <td style="padding:10px 16px;font-size:14px;color:#1A1410">${order.user.email}</td>
            </tr>
            ${shippingAddr ? `
            <tr>
              <td style="padding:10px 16px;font-size:14px;color:#5A554F">Ship to</td>
              <td style="padding:10px 16px;font-size:14px;color:#1A1410">
                ${shippingAddr.fullName ?? ""}<br>
                ${shippingAddr.streetAddress ?? ""}${shippingAddr.addressLine2 ? `, ${shippingAddr.addressLine2}` : ""}<br>
                ${shippingAddr.city ?? ""}, ${shippingAddr.province ?? ""} ${shippingAddr.postalCode ?? ""}<br>
                ${shippingAddr.country ?? "CA"}
              </td>
            </tr>` : ""}
          </table>

          <div style="text-align:center">
            <a href="${process.env.NEXTAUTH_URL}/admin/orders"
              style="display:inline-block;padding:12px 32px;background:#2C4A35;color:white;text-decoration:none;font-size:13px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase">
              View in Admin
            </a>
          </div>
        </div>
      `,
    });

  } catch (error) {
    console.error("sendOrderConfirmation error:", error);
  }
}

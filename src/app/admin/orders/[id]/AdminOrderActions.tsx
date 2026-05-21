"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Package } from "lucide-react";

const ALL_STATUSES = ["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"];

interface Props {
  orderId: string;
  currentStatus: string;
  currentTrackingNumber?: string | null;
  statusColors: Record<string, string>;
}

export function AdminOrderActions({ orderId, currentStatus, currentTrackingNumber, statusColors }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [trackingNumber, setTrackingNumber] = useState(currentTrackingNumber ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const hasChanges =
    status !== currentStatus ||
    trackingNumber !== (currentTrackingNumber ?? "");

  const handleUpdate = async () => {
    if (!hasChanges) return;
    setSaving(true);
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          trackingNumber: trackingNumber || null,
        }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
      {/* Current status badge */}
      <span className={`text-sm px-3 py-1.5 rounded-full font-inter font-light ${statusColors[currentStatus] ?? "bg-gray-50 text-gray-600"}`}>
        {currentStatus}
      </span>

      {/* Status selector */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-3 py-2 rounded-lg border border-[#D4C5B0] bg-white text-sm font-inter font-light text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#C4992E]"
      >
        {ALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>

      {/* Tracking number — shown when SHIPPED or already has one */}
      {(status === "SHIPPED" || status === "DELIVERED" || trackingNumber) && (
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Package size={14} className="text-[#8B8B8B] shrink-0" />
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Tracking number"
            className="px-3 py-2 rounded-lg border border-[#D4C5B0] bg-white text-sm font-inter font-light text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#C4992E] w-44"
          />
        </div>
      )}

      {/* Save button */}
      <button
        onClick={handleUpdate}
        disabled={saving || !hasChanges}
        className="px-4 py-2 bg-[#1A1410] text-white text-sm font-inter font-normal rounded-lg hover:bg-[#2C4A35] transition-colors disabled:opacity-50 flex items-center gap-2"
      >
        {saving && <Loader2 size={14} className="animate-spin" />}
        {saved ? "Saved ✓" : "Update"}
      </button>
    </div>
  );
}

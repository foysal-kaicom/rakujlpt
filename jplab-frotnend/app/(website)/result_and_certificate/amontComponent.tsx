"use client";

import { useBusinessSettingsStore } from "@/stores/useBusinessStore";

export default function AmountComponent() {
  const settings = useBusinessSettingsStore((state) => state.settings);
  return <>{Math.floor(Number(settings?.certificate_amount ?? 0))}</>;
}

// Public-facing labels for facilitator status codes.
const STATUS_LABELS: Record<string, string> = {
  F: "Active Facilitator",
  C: "Certified",
  "C/U": "Certified",
  W: "Facilitator Alum",
};

export function statusLabel(code: string | null | undefined) {
  if (!code) return null;
  return STATUS_LABELS[code.trim().toUpperCase()] ?? null;
}

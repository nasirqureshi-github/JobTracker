import { statusColor, statusLabel } from "../constants/jobs";
export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor(status)}`}
    >
      {statusLabel(status)}
    </span>
  );
}

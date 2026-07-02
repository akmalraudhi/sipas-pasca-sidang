import { getStatusLabel, getStatusColor } from '../lib/data';

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold tracking-wide border transition-all ${getStatusColor(status)}`}>
      {getStatusLabel(status)}
    </span>
  );
}

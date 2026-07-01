import { getStatusLabel, getStatusColor, StatusType } from '../lib/data';

export default function StatusBadge({ status }: { status: StatusType }) {
  return (
    <span className={`status-badge ${getStatusColor(status)}`}>
      {getStatusLabel(status)}
    </span>
  );
}

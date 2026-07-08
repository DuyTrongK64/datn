const HOURS_PER_LEAVE_DAY = 8;

function numberValue(value?: number | string | null) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatLeaveDayHours(value?: number | string | null) {
  const totalHours = Math.max(0, Math.round(numberValue(value) * HOURS_PER_LEAVE_DAY));
  const days = Math.floor(totalHours / HOURS_PER_LEAVE_DAY);
  const hours = totalHours % HOURS_PER_LEAVE_DAY;

  if (days > 0 && hours > 0) return `${days} ngày ${hours} giờ`;
  if (days > 0) return `${days} ngày`;
  if (hours > 0) return `${hours} giờ`;
  return '0 ngày';
}

export function isLeaveDayField(key: string) {
  return ['totalDays', 'usedDays', 'remainingDays', 'leaveUsedDays', 'leaveRemainingDays'].includes(key);
}

export function isToday(date: Date) {
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

/**
 * Verificar se determinado slot já passou.
 */
export function isSlotInThePast(time: string) {
  const [slotHour, slotMinute] = time.split(':').map(Number);

  const now = new Date();
  const currrentHour = now.getHours();
  const currentMinute = now.getMinutes();

  if (slotHour < currrentHour) {
    return true;
  }
  if (slotHour === currrentHour && slotMinute < currentMinute) {
    return true;
  }

  return false;
}

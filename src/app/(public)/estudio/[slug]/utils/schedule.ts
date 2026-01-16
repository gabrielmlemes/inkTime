export function isToday(date: Date) {
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

/**
 * Verifica se determinado slot já passou.
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

export function isSlotSequenceAvailable(
  startSlot: string,
  requiredSlots: number,
  allSlots: string[],
  blockedSlots: string[]
) {
  if (allSlots.length === 0) {
    return false;
  }

  // 1. Verificação de Limite de Expediente
  const [startHour, startMinute] = startSlot.split(':').map(Number);
  const serviceDurationInMinutes = requiredSlots * 30;
  const endServiceMinute = startMinute + serviceDurationInMinutes;

  const endServiceHour = startHour + Math.floor(endServiceMinute / 60);
  const endServiceFinalMinute = endServiceMinute % 60;

  const lastSlot = allSlots[allSlots.length - 1];
  const [lastSlotHour, lastSlotMinute] = lastSlot.split(':').map(Number);

  if (
    endServiceHour > lastSlotHour ||
    (endServiceHour === lastSlotHour && endServiceFinalMinute > lastSlotMinute)
  ) {
    return false;
  }

  // 2. Verificação de Continuidade (Almoço, etc.)
  for (let i = 0; i < requiredSlots; i++) {
    const currentMinute = startMinute + i * 30;
    const hour = startHour + Math.floor(currentMinute / 60);
    const minute = currentMinute % 60;

    const currentSlot = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

    if (!allSlots.includes(currentSlot) || blockedSlots.includes(currentSlot)) {
      return false;
    }
  }

  return true;
}

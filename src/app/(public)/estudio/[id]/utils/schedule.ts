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

/**
 * Verifica se a partir de um slot inicial existe uma sequência de "requiredSlots" disponíveis. Isso é importante para que um cliente não realize um agendamento que ultrapasse por outro agendamento de outro cliente.
 * Exemplo: Se um serviço tem 2 requireds slots e começa em 15:00,
 * precisa garantir que 15:00 e 15:30 não estejam no blockedSlots.
 */
export function isSlotSequenceAvailable(
  startSlot: string, // Primeiro horário disponível
  requiredSlots: number, // Quantidade de slots necessários
  allSlots: string[], // Todos os horários do estúdio
  blockedSlots: string[] // Horários bloqueados
) {
  const startIndex = allSlots.indexOf(startSlot);
  const allSlotsLength = allSlots.length - 1;

  // Regra que bloqueia o agendamento que ultrapassa do horário do expediente (fica a critério do cliente – opcional)
  if (startIndex === -1 || startIndex + requiredSlots > allSlotsLength) {
    return false;
  }

  // Regra que bloqueia o agendamento que "fura" um horário de agendamento já existente
  for (let i = startIndex; i < startIndex + requiredSlots; i++) {
    const slotTime = allSlots[i];

    if (blockedSlots.includes(slotTime)) {
      return false;
    }
  }

  return true;
}

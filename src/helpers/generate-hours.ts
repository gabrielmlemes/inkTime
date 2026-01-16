export function generateTime() {
  const hours: string[] = [];

  for (let i = 8; i <= 23; i++) {
    for (let j = 0; j < 2; j++) {
      const hour = i.toString().padStart(2, '0');
      const minutes = (j * 30).toString().padStart(2, '0');
      hours.push(`${hour}:${minutes}`);
    }
  }

  return hours;
}

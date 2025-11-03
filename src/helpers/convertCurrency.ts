/**
 * Converte um valor monetário em reais (formato brasileiro) para centavos (inteiro).
 * @param {string} amount - Valor em reais no formato "1.234,56"
 * @returns {number} - Valor em centavos
 * @example
 * convertRealtoCents("1.234,56"); // Retorna 123456 cents
 */
export function convertRealtoCents(amount: string) {
  const numericPrice = parseFloat(amount.replace(/\./g, '').replace(',', '.')); // Remove pontos e troca vírgula por ponto
  const priceInCents = Math.round(numericPrice * 100);
  return priceInCents;
}

// Se quiser o valor em centavos -> Valor em reais * 100
// Se quiser o valor em reais -> Valor em centavos / 100

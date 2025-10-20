export const formatPhone = (value: string) => {
  // Remove todos os caracteres que não são dígitos
  const digitsOnly = value.replace(/\D/g, '');

  // Limita a 11 dígitos
  const truncated = digitsOnly.slice(0, 11);

  // Aplica a máscara progressivamente
  if (truncated.length > 7) {
    return `(${truncated.slice(0, 2)}) ${truncated.slice(2, 7)}-${truncated.slice(7)}`;
  }
  if (truncated.length > 2) {
    return `(${truncated.slice(0, 2)}) ${truncated.slice(2)}`;
  }

  return truncated;
};

// Função para extrair apenas os dígitos de uma string de telefone para salvar no banco de dados apenas os números
export const extractDigits = (value: string) => {
  return value.replace(/\D/g, '');
};

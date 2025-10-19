export const timeZones = Intl.supportedValuesOf('timeZone').filter(
  (zone) =>
    zone.startsWith('America/Sao_Paulo') ||
    zone.startsWith('America/Fortaleza') ||
    zone.startsWith('America/Recife') ||
    zone.startsWith('America/Belem') ||
    zone.startsWith('America/Manaus') ||
    zone.startsWith('America/Cuiaba') ||
    zone.startsWith('America/Boa_Vista')
);

const formattedZones = timeZones.map((zone) => {
  const parts = zone.split('/');
  return parts[parts.length - 1].replace(/_/g, ' ');
});

export const timeZonesFormatted = [...new Set(formattedZones)];

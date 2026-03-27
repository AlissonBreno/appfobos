const MONEY_INPUT_MAX_MINOR_UNITS = 999_999_999_999;

/** Exibe centavos (menor unidade) como decimal pt-BR: últimos 2 dígitos são casas decimais. */
export const formatMoneyInputMinorUnits = (minorUnits: number): string => {
  const safeMinorUnits = Math.max(minorUnits, 0);
  const integerPart = Math.floor(safeMinorUnits / 100);
  const fractionalPart = safeMinorUnits % 100;

  const integerFormatted = integerPart.toLocaleString("pt-BR");
  const fractionalFormatted = String(fractionalPart).padStart(2, "0");

  return `${integerFormatted},${fractionalFormatted}`;
};

/** Interpreta o texto digitado/collado: só dígitos, da direita para a esquerda em relação às casas decimais (ex.: 1→0,01; 10→0,10; 100→1,00). */
export const parseMoneyInputToMinorUnits = (text: string): number => {
  const digits = text.replace(/\D/g, "");
  if (digits.length === 0) return 0;

  const parsed = Number.parseInt(digits, 10);
  if (!Number.isFinite(parsed)) return 0;

  return Math.min(parsed, MONEY_INPUT_MAX_MINOR_UNITS);
};

export const minorUnitsToMajorUnits = (minorUnits: number): number =>
  minorUnits / 100;

export const formatMoneyFromCents = (
  amount: number,
  currency: "USD" | "BRL" | "EUR",
  fromCents: boolean = true
) => {
  const value = fromCents ? amount / 100 : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const formatCurrentDatePtBr = (date: Date = new Date()): string => {
  const formatted = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long"
  }).format(date);

  const [day, month] = formatted.split(" de ");
  if (!month) {
    return formatted;
  }

  return `${day} de ${month.charAt(0).toUpperCase()}${month.slice(1)}`;
};


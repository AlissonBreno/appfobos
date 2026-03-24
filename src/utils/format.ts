export const formatMoneyFromCents = (
  cents: number,
  currency: "USD" | "BRL" | "EUR"
) => {
  const value = cents / 100;
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


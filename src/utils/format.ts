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


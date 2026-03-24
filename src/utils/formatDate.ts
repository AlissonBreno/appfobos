/** Data/hora no formato `YYYY-MM-DD HH:mm:ss` (alinhado ao mock de transações). */
export const toSqlDateTime = (date: Date = new Date()): string => {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

/** Instantâneo atual em formato SQL (atalho para `toSqlDateTime()`). */
export const toSqlDateTimeNow = (): string => toSqlDateTime();

export const parseDateTime = (value: string) => {
  const normalized = value.includes("T") ? value : value.replace(" ", "T");
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? new Date(0) : parsed;
};

export const toDateTime = (isoDate: string): string => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${isoDate} ${hours}:${minutes}:${seconds}`;
};

export const occurredAtToDdMmYyyy = (occurredAt: string): string => {
  const parsed = parseDateTime(occurredAt);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error("Data da transação inválida");
  }

  const day = String(parsed.getDate()).padStart(2, "0");
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const year = String(parsed.getFullYear());

  return `${day}/${month}/${year}`;
};

export const toIsoDate = (date: string): string => {
  const trimmedDate = date.trim();
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (isoDatePattern.test(trimmedDate)) return trimmedDate;

  const [day, month, year] = trimmedDate.split("/");
  if (!day || !month || !year) {
    throw new Error("Data inválida para cadastro da transação");
  }

  const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error("Data inválida para cadastro da transação");
  }

  const formattedDay = String(parsedDate.getDate()).padStart(2, "0");
  const formattedMonth = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const formattedYear = String(parsedDate.getFullYear());

  return `${formattedYear}-${formattedMonth}-${formattedDay}`;
};

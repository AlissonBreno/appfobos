import type { User } from "./user";

export type ActiveUser = User & {
  firstName: string;
};

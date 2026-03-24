import { usersMock } from "@/mocks/users";
import type { User } from "@/types/user";

const getUsers = (): User[] => {
  return usersMock as User[];
};

const getUserById = (userId: number): User | null => {
  return getUsers().find((user) => user.id_users === userId) ?? null;
};

const getUserByLogin = (login: string): User | null => {
  return getUsers().find((user) => user.login === login) ?? null;
};

const getActiveUser = (preferredUserId: number): User | null => {
  return getUserById(preferredUserId) ?? getUsers()[0] ?? null;
};

export const usersService = {
  getUsers,
  getUserById,
  getUserByLogin,
  getActiveUser
};

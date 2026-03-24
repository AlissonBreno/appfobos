import { usersMock } from "@/mocks/users";
import type { User } from "@/types/user";

const DEFAULT_ACTIVE_USER_ID = 1;

const getUsers = (): User[] => {
  return usersMock as User[];
};

const getUserById = (userId: number): User | null => {
  return getUsers().find((user) => user.id_users === userId) ?? null;
};

const getActiveUser = (preferredUserId = DEFAULT_ACTIVE_USER_ID): User | null => {
  return getUserById(preferredUserId) ?? getUsers()[0] ?? null;
};

export const usersService = {
  getUsers,
  getUserById,
  getActiveUser
};

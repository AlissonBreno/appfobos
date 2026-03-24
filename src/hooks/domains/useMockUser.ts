import { useMemo } from "react";
import { usersMock } from "@/mocks/users";
import type { ActiveMockUser, MockUser } from "./types";

const DEFAULT_ACTIVE_USER_ID = 1;

const getFirstName = (name: string) => {
  const [first] = name.trim().split(" ");
  return first || name;
};

export const useMockUser = (preferredUserId = DEFAULT_ACTIVE_USER_ID) => {
  return useMemo(() => {
    const users = usersMock as MockUser[];
    const activeUser =
      users.find((user) => user.id_users === preferredUserId) ??
      users[0] ??
      null;

    const active: ActiveMockUser | null = activeUser
      ? {
          ...activeUser,
          firstName: getFirstName(activeUser.name)
        }
      : null;

    return {
      users,
      activeUser: active,
      activeUserId: active?.id_users ?? null,
      firstName: active?.firstName ?? ""
    };
  }, [preferredUserId]);
};

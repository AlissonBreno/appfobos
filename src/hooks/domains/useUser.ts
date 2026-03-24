import { useMemo } from "react";
import { usersService } from "@/services";
import type { ActiveUser } from "../../types/activeUser";
import type { User } from "../../types/user";

const DEFAULT_ACTIVE_USER_ID = 1;

const getFirstName = (name: string): string => {
  const [first] = name.trim().split(" ");
  return first || name;
};

export const useUser = (preferredUserId = DEFAULT_ACTIVE_USER_ID) => {
  return useMemo(() => {
    try {
      const users = usersService.getUsers() as User[];
      const selectedUser = usersService.getActiveUser(preferredUserId);
      const activeUser: ActiveUser | null = selectedUser
        ? { ...selectedUser, firstName: getFirstName(selectedUser.name) }
        : null;

      return {
        data: {
          users,
          activeUser,
          activeUserId: activeUser?.id_users ?? null,
          firstName: activeUser?.firstName ?? ""
        },
        loading: false,
        error: null as Error | null
      };
    } catch (error) {
      return {
        data: {
          users: [] as User[],
          activeUser: null as ActiveUser | null,
          activeUserId: null as number | null,
          firstName: ""
        },
        loading: false,
        error: error instanceof Error ? error : new Error("Failed to load user")
      };
    }
  }, [preferredUserId]);
};

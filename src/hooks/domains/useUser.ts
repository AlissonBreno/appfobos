import { useMemo } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { usersService } from "@/services";
import type { ActiveUser } from "../../types/activeUser";
import type { User } from "../../types/user";

const getFirstName = (name: string): string => {
  const [first] = name.trim().split(" ");
  return first || name;
};

export const useUser = () => {
  const { userId } = useAuth();

  return useMemo(() => {
    if (userId === null) {
      return {
        data: {
          users: [] as User[],
          activeUser: null as ActiveUser | null,
          activeUserId: null as number | null,
          firstName: ""
        },
        loading: false,
        error: null as Error | null
      };
    }

    try {
      const users = usersService.getUsers() as User[];
      const selectedUser = usersService.getActiveUser(userId);
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
  }, [userId]);
};

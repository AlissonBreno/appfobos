import { useEffect, useMemo, useState } from "react";
import { persistAppUser } from "@/features/auth/authTokenStorage";
import { useAuth } from "@/hooks/useAuth";
import { usersService } from "@/services";
import type { ActiveUser } from "../../types/activeUser";
import type { User } from "../../types/user";

const getFirstName = (name: string): string => {
  const [first] = name.trim().split(" ");
  return first || name;
};

const firstNameFromEmail = (email: string): string => {
  const [local] = email.split("@");
  return (local ?? email).trim() || email;
};

export const useUser = () => {
  const { user: authUser, isAuthenticated, loading: authLoading } = useAuth();
  const [resolvedUser, setResolvedUser] = useState<User | null>(null);
  const [resolutionComplete, setResolutionComplete] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isAuthenticated || authUser === null) {
      setResolvedUser(null);
      setResolutionComplete(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setResolvedUser(null);
    setError(null);
    setResolutionComplete(false);

    const run = async () => {
      try {
        const user = await usersService.getAppUserFromPersistedToken({
          fallbackLogin: authUser.email,
        });

        if (cancelled) {
          return;
        }
        if (user !== null) {
          try {
            await persistAppUser(user);
          } catch {
            // Ignore persistence failures; app still works without cached profile.
          }
        }
        setResolvedUser(user);
      } catch (fetchError) {
        if (cancelled) {
          return;
        }
        setResolvedUser(null);
        setError(
          fetchError instanceof Error
            ? fetchError
            : new Error("Failed to load user")
        );
      } finally {
        if (!cancelled) {
          setResolutionComplete(true);
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, authUser]);

  const userResolutionPending =
    isAuthenticated && authUser !== null && !resolutionComplete;

  return useMemo(() => {
    if (!isAuthenticated || authUser === null) {
      return {
        data: {
          activeUserId: null as number | null,
          firstName: "",
        },
        loading: authLoading,
        error: null as Error | null,
      };
    }

    if (error !== null) {
      return {
        data: {
          activeUserId: null as number | null,
          firstName: "",
        },
        loading: false,
        error,
      };
    }

    const email = authUser.email;
    const loading = authLoading || userResolutionPending;

    if (resolvedUser) {
      const activeUser: ActiveUser = {
        ...resolvedUser,
        firstName: getFirstName(resolvedUser.name),
      };

      return {
        data: {
          activeUserId: resolvedUser.id_users,
          firstName: activeUser.firstName,
        },
        loading,
        error: null as Error | null,
      };
    }

    const display =
      authUser.displayName?.trim() ||
      (email ? firstNameFromEmail(email) : "");

    return {
      data: {
        activeUserId: null as number | null,
        firstName: display,
      },
      loading,
      error: null as Error | null,
    };
  }, [
    authLoading,
    authUser,
    error,
    isAuthenticated,
    resolvedUser,
    userResolutionPending,
  ]);
};

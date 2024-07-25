"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";

import { User } from "@/app/api/model/user";
import { SWRKeys } from "@/types/constants";
import { CustomException } from "@/app/api";
import { checkAuth } from "@/utils/authorization";
import { useRouter } from "next/navigation";
import { UserAPI } from "@/api/user";

export const useUser = () => {
  const router = useRouter();

  const { data, isLoading, isValidating } = useSWR(
    SWRKeys.getUser,
    async () => {
      try {
        const response = await UserAPI.getUser();
        const user: User = await response.json();
        return user;
      } catch (error) {
        const exception: CustomException = error as CustomException;
        const isNotAuth: boolean = checkAuth(exception.errorCode);

        if (isNotAuth) {
          await UserAPI.logout();
          removeUser();
          router.refresh();
        }
      }
    },
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      refreshInterval: 30 * 60 * 1000,
    },
  );
  const [user, setUser] = useState<User | undefined | null>(data || undefined);

  const addUser = async (user: User | undefined | null) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };

  useEffect(() => {
    addUser(data);
  }, [data]);

  return { user, isLoading, isValidating, addUser, removeUser };
};

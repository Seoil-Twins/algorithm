"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";

import { User } from "@/types/user";
import { UserKeys } from "@/types/constants";
import { getUser, logout } from "@/app/actions/user";

export const useUser = () => {
  const { data, isLoading, isValidating } = useSWR(
    UserKeys.getUser,
    async () => {
      const userResponse = await getUser();

      if (userResponse.status !== 200) {
        return null;
      }
      return userResponse.data as User;
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

  const removeUser = async () => {
    setUser(null);
    await logout();
  };

  useEffect(() => {
    addUser(data);
  }, [data]);

  return { user, isLoading, isValidating, addUser, removeUser };
};

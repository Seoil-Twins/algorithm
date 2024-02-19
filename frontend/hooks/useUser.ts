"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";

import { User } from "@/interfaces/user";

import { UserKeys, getUser } from "@/api/user";

export const useUser = () => {
  const { data, isLoading, isValidating } = useSWR(
    UserKeys.getUser,
    async () => {
      try {
        const userResponse = await getUser();
        return userResponse.data;
      } catch (error) {
        return undefined;
      }
    },
    {
      revalidateOnFocus: false,
      errorRetryInterval: 0,
      refreshInterval: 30 * 60 * 1000,
    },
  );
  const [user, setUser] = useState<User | undefined>(data || undefined);

  const addUser = async (user: User) => {
    setUser(user);
  };

  const removeUser = () => {
    // remove cookie
    setUser(undefined);
  };

  useEffect(() => {
    addUser(data);
  }, [data]);

  return { user, isLoading, isValidating, addUser, removeUser };
};

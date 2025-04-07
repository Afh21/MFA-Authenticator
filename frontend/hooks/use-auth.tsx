"use client";

import { getUserSession } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useAuth = () => {
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getUserSession,
    staleTime: Infinity,
  });

  return query;
};

export default useAuth;

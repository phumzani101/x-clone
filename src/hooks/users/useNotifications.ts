import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useNotification = (userId?: string) => {
  const url = userId ? `/api/users/${userId}/notifications` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return { data, error, isLoading, mutate };
};

export default useNotification;

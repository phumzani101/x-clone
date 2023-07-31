import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useUser = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/users/current",
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useUser;

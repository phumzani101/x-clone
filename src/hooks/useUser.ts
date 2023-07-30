import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useUser = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/users/current",
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useUser;

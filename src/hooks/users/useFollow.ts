import { useCallback, useMemo } from "react";
import useLoginModal from "../useLoginModal";
import useUser from "./useUser";
import useUserById from "./useUserById";
import { toast } from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useUser();
  const { mutate: mutateFetchUser } = useUserById(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      await axios.post(`/api/users/${userId}/follow`);
      mutateCurrentUser();
      mutateFetchUser();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [loginModal]);

  return { isFollowing, toggleFollow };
};

export default useFollow;

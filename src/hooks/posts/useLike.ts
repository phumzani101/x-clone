import useUser from "@/hooks/users/useUser";
import usePost from "@/hooks/posts/usePost";
import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import usePosts from "./usePosts";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useUser();
  const { data: post, mutate: mutatePost } = usePost(postId);
  const { mutate: mutatePosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = post?.likeIds || [];

    return list.includes(currentUser?.id.toString());
  }, [currentUser, post]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      await axios.post(`/api/posts/${postId}/like`);
      mutatePost();
      mutatePosts();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [currentUser, loginModal, postId]);

  return { hasLiked, toggleLike };
};

export default useLike;

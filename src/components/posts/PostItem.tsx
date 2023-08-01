import useLoginModal from "@/hooks/useLoginModal";
import useUser from "@/hooks/users/useUser";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import Avatar from "../myui/Avatar";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import useLike from "@/hooks/posts/useLike";

const PostItem = ({
  userId,
  post,
}: {
  userId?: string;
  post: Record<string, any>;
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: user } = useUser();
  const { hasLiked, toggleLike } = useLike({ postId: post.id, userId });

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/users/${post.user.id}`);
    },
    [router, post.user.id]
  );

  const goToPost = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/posts/${post.id}`);
    },
    [router, post.id]
  );

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();

      if (!user) {
        return loginModal.onOpen();
      }

      toggleLike();
    },
    [loginModal, user, toggleLike]
  );

  const createdAt = useMemo(() => {
    if (!post?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(post?.createdAt));
  }, [post?.createdAt]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div
      onClick={goToPost}
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={post.user.id} />
        <div>
          <div className="flex flex-row items-center gap-3">
            <p
              className="text-white font-semibold cursor-pointer hover:underline"
              onClick={goToUser}
            >
              {post?.user?.name}
            </p>
            <span
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
              onClick={goToUser}
            >
              @{post?.user?.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{post.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{post.comments?.length || 0}</p>
            </div>
            <div
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
              onClick={onLike}
            >
              <LikeIcon size={20} color={hasLiked ? "red" : ""} />
              <p>{post.likeIds?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;

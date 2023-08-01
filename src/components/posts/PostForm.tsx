"use client";
import usePosts from "@/hooks/posts/usePosts";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useUser from "@/hooks/users/useUser";
import axios from "axios";
import React, { FC, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "../myui/Button";
import Avatar from "../myui/Avatar";
import usePost from "@/hooks/posts/usePost";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const PostForm: FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: user } = useUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      if (isComment) {
        await axios.post(`/api/posts/${postId}/comments`, { body });
        toast.success("Comment posted");
      } else {
        await axios.post(`/api/posts`, { body });
        toast.success("Tweet created");
      }

      setBody("");
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error("Failed to create the tweet, please try again later");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePost, isComment, postId, mutatePosts]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {user ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={user.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
              placeholder={placeholder}
            ></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                title="Tweet"
                onClick={onSubmit}
                disabled={isLoading || !body}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">
            Welcome to X-clone
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button title="Login" onClick={loginModal.onOpen} />
            <Button title="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostForm;

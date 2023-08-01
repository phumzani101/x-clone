"use client";
import Header from "@/components/myui/Header";
import PostForm from "@/components/posts/PostForm";
import PostItem from "@/components/posts/PostItem";
import usePost from "@/hooks/posts/usePost";
import React from "react";
import { ClipLoader } from "react-spinners";

const PostPage = ({ params }: { params: { postId: string } }) => {
  const postId = params.postId;

  const { data: post, isLoading } = usePost(postId as string);

  if (isLoading || !post) {
    return (
      <div className="flex justify-center">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <div>
      <Header title="Tweet" showBackArrow />
      <PostItem post={post} />
      <PostForm postId={postId} isComment placeholder="Tweet your reply" />
    </div>
  );
};

export default PostPage;

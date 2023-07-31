"use client";
import usePosts from "@/hooks/posts/usePosts";
import React from "react";
import PostItem from "./PostItem";

const PostFeed = ({ userId }: { userId?: string }) => {
  const { data: posts = [] } = usePosts(userId);
  return (
    <div>
      {posts.map((post: any) => (
        <PostItem userId={userId} key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostFeed;

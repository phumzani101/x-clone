import React from "react";
import CommentItem from "./CommentItem";

const CommentFeed = ({
  comments = [],
}: {
  comments: Record<string, any>[];
}) => {
  return (
    <div>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentFeed;

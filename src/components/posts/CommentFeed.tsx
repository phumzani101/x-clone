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
        <div className="">
          <CommentItem key={comment.id} comment={comment} />
        </div>
      ))}
    </div>
  );
};

export default CommentFeed;

import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import Avatar from "../myui/Avatar";

const CommentItem = ({ comment }: { comment: Record<string, any> }) => {
  const router = useRouter();

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/users/${comment?.user?.id}`);
    },
    [router, comment?.user?.id]
  );

  const createdAt = useMemo(() => {
    if (!comment?.createAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(comment?.createAt));
  }, [comment?.createAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={comment?.user?.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              className="text-white font-semibold cursor-pointer hover:underline"
              onClick={goToUser}
            >
              {comment?.user?.name}
            </p>
            <span
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
              onClick={goToUser}
            >
              @{comment?.user?.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{comment.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;

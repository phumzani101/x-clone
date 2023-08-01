"use client";
import useUser from "@/hooks/users/useUser";
import { format } from "date-fns";
import React, { useMemo } from "react";
import Button from "../myui/Button";
import { BiCalendar } from "react-icons/bi";
import useEditModal from "@/hooks/useEditModal";
import useFollow from "@/hooks/users/useFollow";

const UserBio = ({ user }: { user?: any }) => {
  const { data: currentUser } = useUser();
  const editModal = useEditModal();
  const { isFollowing, toggleFollow } = useFollow(user?.id);

  const createdAt = useMemo(() => {
    if (!user?.createdAt) {
      return null;
    }
    return format(new Date(user?.createdAt), "MMMM yyyy");
  }, [user?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === user.id ? (
          <Button secondary title="Edit" onClick={editModal.onOpen} />
        ) : (
          <Button
            secondary={!isFollowing}
            outline={isFollowing}
            title={isFollowing ? "Unfollow" : "Follow"}
            onClick={toggleFollow}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">{user.name}</p>
          <p className="text-md text-neutral-500">@{user.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">{user?.bio}</p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-6 mt-4">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{user?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{user?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;

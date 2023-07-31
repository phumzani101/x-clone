"use client";
import EditModal from "@/components/modals/EditModal";
import Header from "@/components/myui/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import useUserById from "@/hooks/useUserById";
import React from "react";
import { ClipLoader } from "react-spinners";

const UserPage = ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;

  const { data: user, isLoading, mutate } = useUserById(userId);

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }
  return (
    <div>
      <Header title={user?.name} showBackArrow />
      <UserHero user={user} />
      <UserBio user={user} />

      {user && <EditModal user={user} mutate={mutate} />}
    </div>
  );
};

export default UserPage;

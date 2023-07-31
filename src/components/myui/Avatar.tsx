"use client";
import useUserById from "@/hooks/users/useUserById";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { data: user } = useUserById(userId);

  return (
    <div
      className={`relative rounded-full hover:opacity-90 transition cursor-pointer 
        ${hasBorder ? "border-4 border-black" : ""} 
        ${isLarge ? "h-32 w-32" : "h-12 w-12"}`}
    >
      <Image
        src={user?.profileImage || "/images/placeholder.png"}
        fill
        style={{ objectFit: "cover", borderRadius: "100%" }}
        alt="Avatar"
      />
    </div>
  );
};

export default Avatar;

import Image from "next/image";
import React from "react";
import Avatar from "../myui/Avatar";

const UserHero = ({ user }: { user: any }) => {
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {user?.coverImage && (
          <Image
            src={user?.coverImage}
            fill
            style={{ objectFit: "cover" }}
            alt="Cover Image"
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={user.id} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;

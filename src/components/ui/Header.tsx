"use client";
import { useRouter } from "next/navigation";
import React, { FC, useCallback } from "react";
import { BsArrowBarLeft } from "react-icons/bs";

interface HeaderProps {
  title: string;
  showBackArrow?: boolean;
}

const Header: FC<HeaderProps> = ({ title, showBackArrow }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BsArrowBarLeft
            onClick={handleBack}
            color="white"
            size={20}
            className="cursor-pointer hover:opacity-70 transition"
          />
        )}
        <h1 className="text-white text-xl font-semibold">{title}</h1>
      </div>
    </div>
  );
};

export default Header;

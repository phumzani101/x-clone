"use client";

import useLoginModal from "@/components/hooks/useLoginModal";
import React, { useCallback } from "react";
import { BsFillPencilFill } from "react-icons/bs";

const SidebarTweetButton = () => {
  const loginModal = useLoginModal();

  const onClick = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <div onClick={onClick}>
      <div className="relative rounded-full mt-6 h-14 w-14 items-center justify-center p-4 bg-sky-500 hover:bg-opacity-90 cursor-pointer lg:hidden">
        <BsFillPencilFill size={24} color="white" />
      </div>

      <div className="relative hidden  mt-6 lg:flex items-center justify-center gap-4 px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer text-center">
        <BsFillPencilFill size={28} color="white" />{" "}
        <p className="hidden lg:block text-white font-semibold  text-[20px]">
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;

"use client";
import Link from "next/link";
import React from "react";
import { BsTwitter } from "react-icons/bs";

const SidebarLogo = () => {
  return (
    <Link href="/">
      <div className="flex items-center rounded-full h-14 w-14 p-4 hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition">
        <BsTwitter size={28} color="white" />
      </div>
    </Link>
  );
};

export default SidebarLogo;

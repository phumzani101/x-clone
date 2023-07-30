"use client";
import Link from "next/link";
import React from "react";
import { BsXLg } from "react-icons/bs";

const SidebarLogo = () => {
  return (
    <Link href="/">
      <div className="flex flex-row items-center">
        <div className="relative rounded-full h-14 w-14 items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden text-sky-500">
          <BsXLg size={28} />
        </div>
        <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-full w-full cursor-pointer text-sky-500">
          <BsXLg size={28} />
          <p className="hidden lg:block text-semibold text-2xl">Clone</p>
        </div>
      </div>
      {/* <div className="flex items-center rounded-full h-14 w-14 p-4 hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition">
        <BsTwitter size={28} color="white" />
      </div> */}
    </Link>
  );
};

export default SidebarLogo;

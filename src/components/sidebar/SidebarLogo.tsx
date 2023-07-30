"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsXLg } from "react-icons/bs";

const SidebarLogo = () => {
  return (
    <Link href="/">
      <div className="flex flex-row items-center">
        <div className="relative rounded-full h-38 w-38 items-center justify-center p-2 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden text-sky-500">
          <Image src="/images/xlogo.png" width={38} height={38} alt="logo" />
        </div>
        <div className="relative hidden lg:flex items-center gap-4 rounded-full w-full cursor-pointer">
          {/* <BsXLg size={28} /> */}
          <Image src="/images/xlogo.png" width={50} height={50} alt="logo" />

          <p className="hidden lg:block text-semibold">clone</p>
        </div>
      </div>
      {/* <div className="flex items-center rounded-full h-14 w-14 p-4 hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition">
        <BsTwitter size={28} color="white" />
      </div> */}
    </Link>
  );
};

export default SidebarLogo;

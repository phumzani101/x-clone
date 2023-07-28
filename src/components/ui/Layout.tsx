"use client";
import React from "react";
import Sidebar from "@/components/ui/sidebar/Sidebar";
import FollowBar from "@/components/ui/FollowBar";
import LoginModal from "@/components/ui/modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-screen bg-black">
        <div className="container h-full mx-auto xl:px-30 max-w-6xl">
          <div className="grid grid-cols-4 h-full">
            <Sidebar />
            <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
              {children}
            </div>
            <FollowBar />
          </div>
        </div>
      </div>

      <LoginModal />
      <RegisterModal />
    </>
  );
};

export default Layout;

import React from "react";
import {
  BsBellFill,
  BsBoxArrowLeft,
  BsFillPersonFill,
  BsHouseFill,
} from "react-icons/bs";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";
import useUser from "@/hooks/users/useUser";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const { data: user } = useUser();
  const routes = [
    {
      name: "Home",
      href: "/",
      Icon: BsHouseFill,
      auth: false,
    },
    {
      name: "Notifications",
      href: "/notifications",
      Icon: BsBellFill,
      auth: true,
      alert: user?.hasNotification || false,
    },
    {
      name: "Profile",
      href: `/users/${user?.id}`,
      Icon: BsFillPersonFill,
      auth: true,
    },
  ];
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {routes.map((route) => (
            <SidebarItem key={route.href} {...route} />
          ))}
          {user && (
            <SidebarItem
              onClick={() => signOut()}
              Icon={BsBoxArrowLeft}
              name="Logout"
              href="!#"
            />
          )}

          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

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

const Sidebar = () => {
  const routes = [
    {
      name: "Home",
      href: "/",
      Icon: BsHouseFill,
    },
    {
      name: "Notifications",
      href: "/notifications",
      Icon: BsBellFill,
    },
    {
      name: "Profile",
      href: "/users/name",
      Icon: BsFillPersonFill,
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
          <SidebarItem
            onClick={() => {}}
            Icon={BsBoxArrowLeft}
            name="Logout"
            href="!#"
          />
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

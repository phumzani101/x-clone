import useLoginModal from "@/hooks/useLoginModal";
import useUser from "@/hooks/users/useUser";
import { useRouter } from "next/navigation";
import React, { FC, useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

interface SidebarItemProps {
  name: string;
  href?: string;
  Icon: IconType;
  auth?: boolean;
  onClick?: () => void;
  alert?: boolean;
}

const SidebarItem: FC<SidebarItemProps> = ({
  name,
  href,
  Icon,
  onClick,
  auth,
  alert,
}) => {
  const router = useRouter();
  const { data: user } = useUser();
  const loginModal = useLoginModal();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !user) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, onClick, href, auth, loginModal, user]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="relative rounded-full h-14 w-14 items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={20} color="white" />
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />
        ) : null}
      </div>
      <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer w-full">
        <Icon size={20} color="white" />{" "}
        <p className="hidden lg:block text-white">{name}</p>
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />
        ) : null}
      </div>
    </div>
  );
};

export default SidebarItem;

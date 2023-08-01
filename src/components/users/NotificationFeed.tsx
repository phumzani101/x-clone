import useNotification from "@/hooks/users/useNotifications";
import useUser from "@/hooks/users/useUser";
import React, { useEffect } from "react";
import { BsTwitter } from "react-icons/bs";

const NotificationFeed = () => {
  const { data: user, mutate: mutateUser } = useUser();
  const { data: notifications = [] } = useNotification(user?.id);
  useEffect(() => {
    mutateUser();
  }, []);

  if (notifications.length === 0) {
    return (
      <div className="text-neutral-500 text-center p-6 text-xl">
        No notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {notifications.map((note: any) => (
        <div
          key={note?.id}
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
        >
          <BsTwitter color="white" size={32} />
          <p className="text-white">{note?.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationFeed;

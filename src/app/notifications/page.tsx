"use client";
import Header from "@/components/myui/Header";
import NotificationFeed from "@/components/users/NotificationFeed";
import useUser from "@/hooks/users/useUser";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const NotificationPage = () => {
  const router = useRouter();
  const { data: user } = useUser();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div>
      <Header title="Notifications" showBackArrow />
      <NotificationFeed />
    </div>
  );
};

export default NotificationPage;

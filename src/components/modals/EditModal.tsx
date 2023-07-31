"use client";
import React, { useCallback, useEffect, useState } from "react";
import Modal from "@/components/modals/Modal";
import useEditModal from "@/hooks/useEditModal";
import Input from "@/components/myui/Input";
import useLoginModal from "@/hooks/useLoginModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { KeyedMutator } from "swr";
import UserImageUpload from "../users/UserImageUpload";

const EditModal = ({
  user,
  mutate,
}: {
  user?: any;
  mutate: KeyedMutator<any>;
}) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [coverimage, setCoverimage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // use modal state
  const editModal = useEditModal();
  const loginModal = useLoginModal();
  const router = useRouter();

  useEffect(() => {
    setUsername(user?.username || "");
    setName(user?.name || "");
    setBio(user?.bio || "");
    setProfileImage(user?.profileImage || "");
    setCoverimage(user?.coverimage || "");
  }, [user]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch(`/api/users/${user.id}`, {
        bio,
        profileImage,
        coverimage,
        username,
        name,
      });
      mutate();
      toast.success("Account Updated");
      // close modal
      editModal.onClose();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Failed to edit, please try again later");
    } finally {
      setIsLoading(false);
    }
  }, [
    bio,
    profileImage,
    coverimage,
    username,
    name,
    editModal,
    user?.id,
    router,
    mutate,
  ]);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    editModal.onClose();
    loginModal.onOpen();
  }, [isLoading, editModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      {/* <UserImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image: string) => {
          setProfileImage(image);
        }}
        title="Upload profile image"
      />
      <UserImageUpload
        value={coverimage}
        disabled={isLoading}
        onChange={(image: string) => {
          setCoverimage(image);
        }}
        title="Upload cover image"
      /> */}
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Full Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?{" "}
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          Login
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={editModal.isOpen}
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      title="Edit"
      actionLabel="Edit"
      body={bodyContent}
      footer={footerContent}
      disabled={isLoading}
    />
  );
};

export default EditModal;

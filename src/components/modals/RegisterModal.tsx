"use client";
import React, { useCallback, useState } from "react";
import Modal from "@/components/modals/Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import Input from "@/components/myui/Input";
import useLoginModal from "@/hooks/useLoginModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // use modal state
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/users/register", {
        email,
        password,
        username,
        name,
      });

      toast.success("Account created");
      signIn("credentials", { email, password });
      // close modal
      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to register, please try again later");
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, password, username, name]);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
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
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />

      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
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
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      title="Register"
      actionLabel="Register"
      body={bodyContent}
      footer={footerContent}
      disabled={isLoading}
    />
  );
};

export default RegisterModal;

"use client";
import React, { useCallback, useState } from "react";
import Modal from "@/components/ui/Modal";
import useLoginModal from "@/components/hooks/useLoginModal";
import Input from "../Input";
import useRegisterModal from "@/components/hooks/useRegisterModal";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // use modal state
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      // close modal
      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal]);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />

      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Do not have an account?{" "}
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          Register
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      title="Login"
      actionLabel="Login"
      body={bodyContent}
      footer={footerContent}
      disabled={isLoading}
    />
  );
};

export default LoginModal;

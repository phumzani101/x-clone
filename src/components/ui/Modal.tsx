"use client";
import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { BsXLg } from "react-icons/bs";
import Button from "@/components/ui/Button";

interface ModalProps {
  isOpen?: boolean;
  title: string;
  body?: ReactElement;
  footer?: ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  onClose,
  onSubmit,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  if (!isMounted) {
    return null;
  }

  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70">
        <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
          {/* Content */}
          <div className="flex flex-col relative w-full h-full lg:h-auto border-0 rounded-lg bg-black outline-none focus:outline-none">
            {/* Header */}
            <div className="flex items-center justify-between p-10 rounded-t">
              <h3 className="text-3xl font-semibold text-white">{title}</h3>
              <button
                onClick={handleClose}
                className="p-1 ml-auto bottom-0 text-white hover:opacity-70 transition"
              >
                <BsXLg />
              </button>
            </div>
            {/* Body */}
            <div className="relative p-10 flex-auto">{body}</div>
            {/* Footer */}
            <div className="flex flex-col gap-2 p-10">
              {actionLabel && (
                <Button
                  disabled={disabled}
                  title={actionLabel}
                  secondary
                  fullWidth
                  large
                  onClick={handleSubmit}
                />
              )}
              {footer}
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Modal;

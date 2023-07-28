"use client";
import React, { FC } from "react";

interface ButtonProps {
  title: string;
  secondary?: boolean;
  fullWidth: boolean;
  large?: boolean;
  disabled?: boolean;
  outline?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  title,
  secondary,
  fullWidth,
  large,
  disabled = false,
  outline,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-full font-semibold hover:opacity-80 transition bottom-2 
      ${fullWidth ? "w-full" : "w-fit"} 
      ${
        secondary
          ? "bg-white text-black border-black"
          : "bg-sky-500 text-white border-sky-500"
      } 
      ${large ? "text-xl px-5 py-3" : "text-md px-4 py-2"} 
      ${outline ? "bg-transparent border-white text-white" : ""}
      `}
    >
      {title}
    </button>
  );
};

export default Button;

import type { ReactNode } from "react";
import "./Button.css";

export interface ButtonProps {
  disabled?: boolean;
  label: string | ReactNode;
  onClick?: () => void;
  title?: string;
  type?: "button" | "reset" | "submit";
  variant?: "primary" | "secondary";
}

export const Button = ({
  label,
  onClick,
  title,
  type = "button",
  variant = "primary",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`button button-${variant}`}
      onClick={onClick}
      title={title}
    >
      {label}
    </button>
  );
};

import type { ReactNode, SyntheticEvent } from "react";
import "./Button.css";

export interface ButtonProps {
  disabled?: boolean;
  label: string | ReactNode;
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void;
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

import type { ChangeEvent } from "react";
import "./TextField.css";

export interface TextFieldProps {
  autofocus?: boolean;
  placeholder: string;
  label: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value?: string;
}

export const TextField = ({
  autofocus = false,
  placeholder,
  name,
  label,
  onChange,
  required = false,
  value,
}: TextFieldProps) => {
  return (
    <div className="text-field-container">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus={autofocus}
        className="text-field"
        id={name}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type="text"
        value={value}
      />
    </div>
  );
};

"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  textArea?: boolean;
  value?: number;
}

const Input = ({
  id,
  label,
  type = "text",
  disabled,
  register,
  required,
  errors,
  textArea,
  value,
}: InputProps) => {
  return (
    <div className="w-full relative">
      {textArea ? (
        <>
          <textarea
            id={id}
            disabled={disabled}
            {...register(id, { required })}
            placeholder=" "
            className={`peer w-full p-4 h-64 font-light bg-white border-2 rounded-md outline-none transition resize-none disabled:opacity-70 disabled:cursor-not-allowed 
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}`}
          />
        </>
      ) : (
        <>
          <input
            id={id}
            disabled={disabled}
            {...register(id, { required })}
            placeholder=" "
            type={type}
            min={type === "number" ? 0 : undefined}
            value={value}
            className={`peer w-full p-4 h-full font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
            ${errors[id] ? "border-rose-500" : "border-neutral-300"}
            ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}`}
          />
        </>
      )}
      <label
        htmlFor={id}
        className={`absolute text-md duration-150 transform -translate-y-2 scale-75 top-2 left-4 z-10 origin-[0] 
        peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100
        peer-focus:-translate-y-2 peer-focus:scale-75
         ${errors[id] ? "text-rose-500" : "text-zinc-400"}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;

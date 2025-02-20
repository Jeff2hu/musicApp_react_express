import { cn } from "@/lib/utils";
import React from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  className?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const InputField = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  className,
  inputProps,
}: InputFieldProps<T>) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        {...inputProps}
        {...register(name)}
        className={cn(
          "w-full rounded-md p-2 bg-zinc-900 text-zinc-100 border border-zinc-700 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          className,
          errors[name] && "border-red-500"
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm text-center">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default InputField;

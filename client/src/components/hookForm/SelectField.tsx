import { cn } from "@/lib/utils";
import { Option } from "@/type/option";
import React from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface SelectFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  options: Option[];
  errors: FieldErrors<T>;
  className?: string;
  selectProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
}

const SelectField = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  className,
  options,
  selectProps,
}: SelectFieldProps<T>) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={name}
        {...selectProps}
        {...register(name)}
        className={cn(
          "w-full rounded-md p-2 bg-zinc-900 text-zinc-100 border border-zinc-700 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500",
          className,
          errors[name] && "border-red-500"
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-sm text-center">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default SelectField;

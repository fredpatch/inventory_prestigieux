import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";

export const QteSoldComponent = ({ disabled }: any) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-2 pt-[6px]">
      <Label
        htmlFor="quantitySold"
        className="text-slate-600"
      >{`Quantity Sold`}</Label>
      <Input
        {...register("qteSold", { valueAsNumber: true })}
        type="text"
        id="quantitySold"
        className="h-11 shadow-none"
        placeholder="12"
        disabled={disabled}
      />

      {/* error message */}
      {errors.quantitySold && (
        <div className={`text-red-500 flex gap-1 items-center text-[13px]`}>
          <MdError />
          <p>
            <>{errors.quantitySold.message}</>
          </p>
        </div>
      )}
    </div>
  );
};

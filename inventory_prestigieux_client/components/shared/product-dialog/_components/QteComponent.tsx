import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";

export const QteComponent = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-2 pt-[6px]">
      <Label htmlFor="quantity" className="text-slate-600">{`Quantity`}</Label>
      <Input
        {...register("quantity", { valueAsNumber: true })}
        type="text"
        id="quantity"
        className="h-11 shadow-none"
        placeholder="34"
      />

      {/* error message */}
      {errors.quantity && (
        <div className={`text-red-500 flex gap-1 items-center text-[13px]`}>
          <MdError />
          <p>
            <>{errors.quantity.message}</>
          </p>
        </div>
      )}
    </div>
  );
};

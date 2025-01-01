import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";

export const CriticalQteComponent = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-2 pt-[6px]">
      <Label
        htmlFor="ctlquantity"
        className="text-slate-600"
      >{`Critical Quantity Level Value`}</Label>
      <Input
        {...register("criticalQuantity", { valueAsNumber: true })}
        type="text"
        id="ctlquantity"
        className="h-11 shadow-none"
        placeholder="34"
      />

      {/* error message */}
      {errors.criticalQuantity && (
        <div className={`text-red-500 flex gap-1 items-center text-[13px]`}>
          <MdError />
          <p>
            <>{errors.criticalQuantity.message}</>
          </p>
        </div>
      )}
    </div>
  );
};

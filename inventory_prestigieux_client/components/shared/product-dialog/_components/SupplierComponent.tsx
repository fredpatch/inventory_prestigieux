import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";

export const SupplierComponent = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor="supplier-name"
        className="text-slate-600"
      >{`Supplier's Name`}</Label>
      <Input
        {...register("supplier")}
        type="text"
        id="supplier-name"
        className="h-11 shadow-none"
        placeholder="TechWorld ..."
      />

      {errors.supplier && (
        <div className={`text-red-500 flex gap-1 items-center text-[13px]`}>
          <MdError />
          <p>
            <>{errors.supplier.message}</>
          </p>
        </div>
      )}
    </div>
  );
};

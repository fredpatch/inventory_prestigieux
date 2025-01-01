import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";
import { IconSelector } from "../icon-selector";

export const ProductName = ({
  onSelectedIcon,
}: {
  onSelectedIcon: (selectedIcon: React.ReactNode) => void;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  function getSelectedIcon(selectedIcon: React.ReactNode) {
    onSelectedIcon(selectedIcon);
  }
  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="product-name" className="text-slate-600">
        {`Product's Name`}
      </Label>
      <div className="flex gap-2 items-center">
        <Input
          {...register("productName")}
          type="text"
          id="product-name"
          className="h-11 shadow-none"
          placeholder="Product's Name"
        />
        <IconSelector onUpdateIcon={getSelectedIcon} />
      </div>

      {/* error message */}
      {errors.productName && (
        <div className="text-red-500 flex gap-1 items-center text-[13px]">
          <MdError />
          <p>The product's name is required</p>
        </div>
      )}
    </div>
  );
};

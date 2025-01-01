"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";
import { NumericFormat } from "react-number-format";

export const PVUComponent = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2 pt-[6px]">
      <Label htmlFor="sellingPrice" className="text-slate-600">{`PVU`}</Label>

      <Controller
        name="sellingPrice"
        control={control}
        defaultValue={""}
        render={({ field: { onChange, value, ...field } }) => (
          <NumericFormat
            {...field}
            value={value}
            customInput={Input}
            id="sellingPrice"
            thousandSeparator
            placeholder="Enter PVU..."
            className="h-11"
            allowNegative={false}
            onValueChange={(values) => {
              const { floatValue, value } = values;

              /* If the input is empty (value is empty string), pass empty string. Otherwise pass the floatValue */
              onChange(value === "" ? "" : floatValue ?? 0);
            }}
          />
        )}
      />

      {/* error message */}
      {errors.price && (
        <div className={`text-red-500 flex gap-1 items-center text-[13px]`}>
          <MdError />
          <p>{String(errors.price.message)}</p>
        </div>
      )}
    </div>
  );
};

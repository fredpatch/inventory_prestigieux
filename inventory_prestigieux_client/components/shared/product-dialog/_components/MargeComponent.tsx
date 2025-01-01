"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";
import { NumericFormat } from "react-number-format";

export const MargeComponent = () => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  // Watch margin calculation
  const [margin, setMargin] = React.useState(0);
  const sellingPrice = watch("sellingPrice");
  const purchasePrice = watch("purchasePrice");

  useEffect(() => {
    const calculatedMargin = sellingPrice - purchasePrice;
    setMargin(calculatedMargin);
  }, [sellingPrice, purchasePrice]);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="margin" className="text-slate-600">{`Marge`}</Label>

      <Controller
        name="margin"
        control={control}
        defaultValue={""}
        render={({ field: { onChange, value, ...field } }) => (
          <NumericFormat
            {...field}
            value={margin.toFixed(2)}
            customInput={Input}
            id="margin"
            thousandSeparator
            className="h-11"
            disabled
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
      {errors.margin && (
        <div className={`text-red-500 flex gap-1 items-center text-[13px]`}>
          <MdError />
          <p>{String(errors.margin.message)}</p>
        </div>
      )}
    </div>
  );
};

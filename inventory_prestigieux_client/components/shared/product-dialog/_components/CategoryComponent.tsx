"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { Dispatch, useEffect, useState } from "react";
import { Product } from "../../table/columns";
import { useFormContext } from "react-hook-form";

interface CategoryComponentProps {
  selectedCategory: string;
  setSelectedCategory: Dispatch<React.SetStateAction<Product["category"]>>;
}

export const CategoryComponent: React.FC<CategoryComponentProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const { setValue } = useFormContext(); // Access react-hook-form's context

  const handleCategoryChange = (value: string) => {
    const category = value as Product["category"];
    setSelectedCategory(category);
    setValue("category", category); // Update the category value in the form
  };

  const categories = [
    "BOISSON_FROIDE",
    "BOISSON_CHAUDE",
    "FOURNITURES",
    "TRANSFER",
  ];

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex flex-col gap-2 poppins">
      <Label className="text-slate-600">{`Product's Category`}</Label>

      <Select
        value={selectedCategory}
        onValueChange={(value: string) =>
          setSelectedCategory(value as Product["category"])
        }
      >
        <SelectTrigger className="h-[45px] shadow-none">
          <SelectValue placeholder={"Select a category"} />
        </SelectTrigger>
        <SelectContent className="poppins">
          {categories.map((category) => (
            <SelectItem
              className="cursor-pointer hover:bg-secondary"
              key={category}
              value={category}
            >
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

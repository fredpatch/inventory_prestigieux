"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandInput,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { LuGitPullRequestDraft } from "react-icons/lu";

interface Category {
  value: string;
  label: string;
}

type CategoriesDropDownProps = {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
};

const categories: Category[] = [
  { value: "BOISSON_CHAUDE", label: "Boisson chaude" },
  { value: "BOISSON_FROIDE", label: "Boisson froide" },
  { value: "TRANSFER", label: "Transfer" },
  { value: "FOURNITURES", label: "Fournitures" },
  // { value: "toys", label: "Toys" },
  // { value: "beauty", label: "Beauty" },
  // { value: "sports", label: "Sports" },
  // { value: "home-decor", label: "Home Decor" },
  // { value: "home-appliances", label: "Home Appliances" },
  // { value: "others", label: "Others" },
];

export const CategoryDropdown = ({
  selectedCategories,
  setSelectedCategories,
}: CategoriesDropDownProps) => {
  const [open, setOpen] = React.useState(false);

  // Debug: log selected categories to see if it's updating
  // console.log("Selected Categories:", selectedCategories);

  const handleCheckboxChange = (value: string) => {
    console.log("Handling change for category:", value);
    setSelectedCategories((prev) => {
      const updatedCategories = prev.includes(value)
        ? prev.filter((category) => category !== value)
        : [...prev, value];

      // console.log("Updated Categories:", updatedCategories); // Debug log for updated state
      return updatedCategories;
    });
  };

  const ClearFilters = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="flex items-center space-x-4 poppins">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant={"secondary"} className="h-10">
            <LuGitPullRequestDraft />
            Categorie
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-56 poppins" side="bottom" align="end">
          <Command className="p-1">
            <CommandInput placeholder="Category" />
            <CommandList>
              <CommandEmpty className="text-slate-500 text-sm text-center p-5">
                No categories found.
              </CommandEmpty>
              <CommandGroup>
                {categories.map((category) => (
                  <CommandItem
                    className="h-9"
                    key={category.value}
                    // value={category.value}
                  >
                    <Checkbox
                      className="size-4 rounded-[4px]"
                      checked={selectedCategories.includes(category.value)}
                      onClick={() => handleCheckboxChange(category.value)}
                    />
                    <div
                      className={`flex items-center gap-1 p-1 rounded-lg px-3 text-[14px]`}
                    >
                      {category.label}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <div className="flex flex-col gap-2 text-[23px]">
              <Separator />
              <Button
                onClick={ClearFilters}
                className="mb-1 text-[12px]"
                variant={"ghost"}
              >
                Retirer tous les filtres
              </Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

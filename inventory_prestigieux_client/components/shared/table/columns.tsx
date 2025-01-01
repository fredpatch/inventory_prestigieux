"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import { ArrowUpDown } from "lucide-react";
import { ProductDropdown } from "./product-dropdown";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { ReactNode } from "react";
import { MdCheckCircle, MdDangerous, MdWarning } from "react-icons/md";
import DateComponent from "../DateComponent";

export type Product = {
  id: string;
  name: string;
  quantitySold: number;
  purchasePrice: number;
  sellingPrice: number;
  totalSoldPerUnit: number;
  margin?: number;
  totalMarginPerUnit: number;
  category: "BOISSON_FROIDE" | "BOISSON_CHAUDE" | "FOURNITURES" | "TRANSFER";
  quantityInStock: number;
  criticalStockLevel: number;
  icon: ReactNode;
  createdAt: Date;
  updatedAt: Date;
};

type SortableHeaderProps = {
  column: Column<Product, unknown>; // Specify the type of data
  label: string;
};

const SortableHeader: React.FC<SortableHeaderProps> = ({ column, label }) => {
  const isSorted = column.getIsSorted();
  const SortingIcon =
    isSorted == "asc"
      ? IoMdArrowDown
      : isSorted == "desc"
      ? IoMdArrowUp
      : ArrowUpDown;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`flex items-start py-[14px] select-none cursor-pointer p-2 gap-1 ${
            isSorted && "text-primary"
          }`}
          aria-label={`Sort by ${label} ${isSorted == "asc" ? "asc" : "desc"}`}
        >
          {label}
          <SortingIcon className="ml-2 h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="bottom">
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <IoMdArrowUp className="mr-2 h-4 w-4" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <IoMdArrowDown className="mr-2 h-4 w-4" />
          Desc
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const StockLevelCell: React.FC<{ row: Product }> = ({ row }) => {
  const isCritical = row.quantityInStock < row.criticalStockLevel;
  const isApproachingCritical =
    row.quantityInStock < row.criticalStockLevel * 1.5 && !isCritical;
  const textColor = isCritical
    ? "text-red-600"
    : isApproachingCritical
    ? "text-yellow-600"
    : "text-green-600";
  const Icon = isCritical
    ? MdDangerous
    : isApproachingCritical
    ? MdWarning
    : MdCheckCircle;

  return (
    <div className={`flex items-center space-x-2 ${textColor} justify-center`}>
      <span>{row.quantityInStock}</span>
      <Icon />
    </div>
  );
};

export const columns = (isAdmin: boolean): ColumnDef<Product>[] => [
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <SortableHeader column={column} label="Date de création" />
    ),
    cell: ({ getValue }) => {
      const date = getValue<any>();
      return <DateComponent creationDate={date} dateString={null} />;
    },
  },
  {
    accessorKey: "name",
    cell: ({ row }) => {
      const Icon = row.original.icon; // Access the icon from the original data
      const name = row.original.name;
      return (
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-sm bg-primary/10 text-primary">
            {Icon}
          </div>

          <span>{name}</span>
        </div>
      );
    },
    header: ({ column }) => <SortableHeader column={column} label="Produit" />,
  },
  {
    accessorKey: "quantitySold",
    header: ({ column }) => <SortableHeader column={column} label="NB Vendu" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2 justify-center">
          <span>{row.original.quantitySold}</span>
        </div>
      );
    },
  },

  ...(isAdmin
    ? [
        {
          accessorKey: "purchasePrice",
          header: ({ column }: any) => (
            <SortableHeader column={column} label="PA Unit" />
          ),
          cell: ({ getValue }: any) => {
            return (
              <div className="flex items-center justify-center">
                <>{`${getValue().toFixed(0)}`}</>
              </div>
            );
          },
        },
        {
          accessorKey: "margin",
          header: ({ column }: any) => (
            <SortableHeader column={column} label="Marge" />
          ),
          cell: ({ getValue }: any) => {
            return (
              <div className="flex items-center justify-center">
                <>{`${getValue().toFixed(0)}`}</>
              </div>
            );
          },
        },
      ]
    : []),
  {
    accessorKey: "sellingPrice",
    header: ({ column }) => <SortableHeader column={column} label="PVU" />,
    cell: ({ getValue }) => {
      return (
        <div className="flex items-center justify-center">
          <>{`${getValue<number>().toFixed(0)}`}</>
        </div>
      );
    },
  },
  {
    accessorKey: "totalSoldPerUnit",
    header: ({ column }) => <SortableHeader column={column} label="PV Total" />,
    cell: ({ getValue }) => {
      return (
        <div className="flex items-center justify-center">
          <>{`${getValue<number>().toFixed(0)}`}</>
        </div>
      );
    },
  },
  {
    accessorKey: "totalMarginPerUnit",
    header: ({ column }) => (
      <SortableHeader column={column} label="Marge Total" />
    ),
    cell: ({ getValue }) => {
      return (
        <div className="flex items-center justify-center">
          <>{`${getValue<number>().toFixed(0)}`}</>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <SortableHeader column={column} label="Modifié le" />
    ),
    cell: ({ getValue }) => {
      const date = getValue<any>();
      return <DateComponent dateString={date} creationDate={null} />;
    },
  },
  {
    filterFn: "multiSelect",
    accessorKey: "category",
    header: ({ column }) => (
      <SortableHeader column={column} label="Catégorie" />
    ),
    cell: ({ row }) => {
      // remove the underscore
      const category = row.original.category;
      // .replace("_", " ");
      return (
        <div className="flex items-center justify-center">
          <span>{category}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "quantityInStock",
    header: ({ column }) => <SortableHeader column={column} label="Stock" />,
    cell: ({ row }) => <StockLevelCell row={row.original} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ProductDropdown row={row} isAdmin={isAdmin} />;
    },
  },
];

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { Dispatch, SetStateAction } from "react";

interface PaginationType {
  pageIndex: number;
  pageSize: number;
}

export const PaginationSelection = ({
  pagination,
  setPagination,
}: {
  pagination: PaginationType;
  setPagination: Dispatch<SetStateAction<PaginationType>>;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="text-gray-500 text-sm">Rows per page</div>
      <Select
        value={pagination.pageSize.toString()}
        onValueChange={(value) =>
          setPagination((prev) => ({
            ...prev,
            pageSize: Number(value),
          }))
        }
      >
        <SelectTrigger className="border rounded-md px-2 w-14">
          <SelectValue placeholder={pagination.pageSize.toString()} />
        </SelectTrigger>
        <SelectContent>
          {[4, 6, 8, 10, 15, 20, 30].map((size) => (
            <SelectItem key={size} value={size.toString()}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
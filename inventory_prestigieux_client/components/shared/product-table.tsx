"use client";

import React, { useEffect } from "react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { IoClose } from "react-icons/io5";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { Input } from "../ui/input";
import { CategoryDropdown } from "./dropdown/category-dropdown";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { PaginationSelection } from "./table/pagination-selection";
import { ExportButtons } from "./export-buttons";
import { exportToCSV } from "@/utils/export-to-csv";

// Define custom filter types
declare module "@tanstack/table-core" {
  interface FilterFns {
    multiSelect: FilterFn<unknown>;
  }
}

// Define custom filter functions
const multiSelectFilter: FilterFn<unknown> = (
  row,
  columnId,
  filterValue: string[]
) => {
  const rowValue = (row.getValue(columnId) as string).toLowerCase();
  const lowercaseFilterValues = filterValue.map((val) => val.toLowerCase());
  return filterValue.length === 0 || lowercaseFilterValues.includes(rowValue);
};

// console.log(`Multi select filter: ${multiSelectFilter}`);

export interface PaginationType {
  pageIndex: number;
  pageSize: number;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const ProductTable = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [pagination, setPagination] = React.useState<PaginationType>({
    pageIndex: 0,
    pageSize: 6,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );

  useEffect(() => {
    // console.log(`Selected statuses changed: ${selectedStatuses}`);

    setColumnFilters((prev) => {
      // Remove both status and category filters if no statuses are selected
      const baseFilters = prev.filter(
        (filter) => filter.id !== "status" && filter.id !== "category"
      );

      const newFilters = [...baseFilters];

      // Add category if there are selected categories
      if (selectedCategories.length > 0) {
        newFilters.push({
          id: "category",
          value: selectedCategories,
        });
      }

      // Set Initial sorting to the created at column
      setSorting([
        {
          id: "createdAt",
          desc: true,
        },
      ]);

      // console.log(`New Column filters: ${newFilter}`);
      return newFilters;
    });
  }, [selectedCategories]);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      columnFilters,
      sorting,
    },
    filterFns: {
      multiSelect: multiSelectFilter,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleExportCSV = () => {
    const filteredData = table
      .getFilteredRowModel()
      .rows.map((row) => row.original);
    exportToCSV(filteredData, "filtered-table-data.csv");
  };

  return (
    <div className="poppins">
      <div className="flex flex-col gap-3 mb-8 mt-6">
        <div className="flex items-center justify-between">
          <Input
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            placeholder="Rechercher un produit par nom..."
            className="max-w-sm h-10"
          />
          <div className="flex items-center gap-4">
            <CategoryDropdown
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
            <ExportButtons onExportCSV={handleExportCSV} />
          </div>
        </div>

        {/* filter area */}
        <FilterArea
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>

      {/* table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination */}
      <div className="flex items-center justify-between mt-5">
        <PaginationSelection
          pagination={pagination}
          setPagination={setPagination}
        />

        {/* pagination buttons */}
        <div className="flex gap-6 items-center">
          <span className="text-sm text-gray-500">
            Page {pagination.pageIndex + 1} / {table.getPageCount()}
          </span>
          <div className="flex items-center justify-end space-x-2 py-4">
            {/* First page button */}
            <Button
              variant={"outline"}
              className="size-9 w-12"
              size={"sm"}
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <BiFirstPage />
            </Button>

            {/* Previous page button */}
            <Button
              variant={"outline"}
              className="size-9 w-12"
              size={"sm"}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <GrFormPrevious />
            </Button>

            {/* Next Page Button */}
            <Button
              className="size-9 w-12"
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <GrFormNext />
            </Button>

            {/* Last Page Button */}
            <Button
              className="size-9 w-12"
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <BiLastPage />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

function FilterArea({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <div className="flex gap-3">
      {/* category */}
      {selectedCategories.length > 0 && (
        <div className="border-dashed border rounded-sm p-1 flex gap-2 items-center px-2 text-sm">
          <span className="text-gray-600">Category</span>
          <Separator orientation="vertical" />
          <div className="flex gap-2 items-center">
            {selectedCategories.length < 3 ? (
              <>
                {selectedCategories.map((category, index) => (
                  <Badge key={index} variant={"secondary"}>
                    {category}
                  </Badge>
                ))}
              </>
            ) : (
              <>
                <Badge variant={"secondary"}>
                  {selectedCategories.length} selected
                </Badge>
              </>
            )}
          </div>
        </div>
      )}

      {selectedCategories.length > 0 && (
        <Button
          onClick={() => {
            setSelectedCategories([]);
          }}
          variant={"ghost"}
          className="p-1 px-2"
        >
          <span>Reset</span>
          <IoClose />
        </Button>
      )}
    </div>
  );
}

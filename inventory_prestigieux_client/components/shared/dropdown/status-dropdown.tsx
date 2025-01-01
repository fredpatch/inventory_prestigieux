import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { LuGitPullRequestDraft } from "react-icons/lu";
import { FaCheck, FaInbox } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

type Status = {
  value: string;
  label: string;
  icon: React.ReactNode;
};

const statuses: Status[] = [
  { value: "Published", label: "Published", icon: <FaCheck /> },
  { value: "Inactive", label: "Inactive", icon: <IoClose /> },
  { value: "Draft", label: "Draft", icon: <FaInbox /> },
];

// const statuses: Status[] = [
//   { value: "In Stock", label: "In Stock", icon: <FaCheck /> },
//   { value: "Low", label: "Low", icon: <FaInbox /> },
//   { value: "Out Of Stock", label: "Out Of Stock", icon: <IoClose /> },
// ];

type StatusDropDownProps = {
  selectedStatuses: string[];
  setSelectedStatuses: React.Dispatch<React.SetStateAction<string[]>>;
};

export const StatusDropdown = ({
  selectedStatuses,
  setSelectedStatuses,
}: StatusDropDownProps) => {
  const [open, setOpen] = React.useState(false);

  function returnColor(status: string) {
    switch (status) {
      case "Published":
        return "text-green-600 bg-green-100";
      case "Inactive":
        return "text-red-600 bg-red-100";
      case "Draft":
        return "text-gray-600 bg-gray-100";
      default:
        return "";
    }

    // switch (status) {
    //   case "In Stock":
    //     return "text-green-600 bg-green-100";
    //   case "Low":
    //     return "text-yellow-600 bg-yellow-100";
    //   case "Out Of Stock":
    //     return "text-red-600 bg-red-100";
    //   default:
    //     return "";
    // }
  }

  const handleCheckboxChange = (value: string) => {
    setSelectedStatuses((prev) => {
      const updatedStatuses = prev.includes(value)
        ? prev.filter((status) => status !== value)
        : [...prev, value];

      return updatedStatuses;
    });
  };

  const ClearFilters = () => {
    setSelectedStatuses([]);
  };
  return (
    <div className="flex items-center space-x-4 poppins">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant={"secondary"} className="h-10">
            <LuGitPullRequestDraft />
            Status
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-48 poppins"
          side="bottom"
          align="center"
        >
          <Command className="p-1">
            <CommandList>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    className="h-10 mb-2"
                    key={status.value}
                    value={status.value}
                    onClick={() => handleCheckboxChange(status.value)}
                  >
                    <Checkbox
                      className="size-4 rounded-[4px] mr-2"
                      checked={selectedStatuses.includes(status.value)}
                      onCheckedChange={() => handleCheckboxChange(status.value)}
                    />
                    <div
                      className={`flex items-center gap-1 ${returnColor(
                        status.value
                      )} p-1 rounded-lg px-4 text-[13px]`}
                    >
                      {status.icon}
                      {status.label}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <div className="flex flex-col gap-2 text-[23px]">
              <Separator />
              <Button
                className="mb-1 text-[12px]"
                variant={"ghost"}
                onClick={ClearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

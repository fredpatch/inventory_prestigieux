"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaInbox } from "react-icons/fa";
import { Product } from "../../table/columns";
import { useFormContext } from "react-hook-form";

interface StatusComponentProps {
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<Product["status"]>>;
}

export const StatusComponent: React.FC<StatusComponentProps> = ({
  selectedTab,
  setSelectedTab,
}) => {
  // console.log("Selected Tab =", selectedTab);
  const { setValue } = useFormContext(); // Access react-hook-form context

  const handleStatusChange = (value: string) => {
    const status = value as Product["status"];
    setSelectedTab(status);
    setValue("status", status); // Update react-hook-form state
  };
  return (
    <div>
      <Label className="text-slate-600">Status</Label>
      <Tabs
        value={selectedTab}
        onValueChange={(value: string) =>
          setSelectedTab(value as Product["status"])
        }
        className="mt-1"
      >
        <TabsList className="h-11 px-2">
          <TabsTrigger
            className={`h-8 ${
              selectedTab === "Published" ? "text-red-500" : ""
            }`}
            value="Published"
          >
            <FaCheck className="pr-1" />
            Published
          </TabsTrigger>
          <TabsTrigger
            className={`h-8 ${
              selectedTab === "Inactive" ? "text-red-500" : ""
            }`}
            value="Inactive"
          >
            <IoClose />
            Inactive
          </TabsTrigger>
          <TabsTrigger
            className={`h-8 ${selectedTab === "Draft" ? "text-red-500" : ""}`}
            value="Draft"
          >
            <FaInbox className="pr-1" />
            Draft
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

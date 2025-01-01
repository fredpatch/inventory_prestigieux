"use client";

import AppTable from "@/components/shared/app-table";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { Card } from "@/components/ui/card";
import { UserProvider, useUser } from "@/context/user-provider";
import useUserStore from "@/context/user-store";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";

export default function Home() {
  const { theme } = useTheme();
  const [isClient, setIsClient] = React.useState(false);
  const bgColor = theme === "dark" ? "bg-secondary" : "bg-gray-50";

  // const { user } = useUser();
  const { loadRoles } = useUserStore();

  useEffect(() => {
    setIsClient(true);
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <AppContent />
    </>
  );
}

const AppContent = () => {
  return (
    <div className="bg-secondary p-3 h-full">
      <Card className="flex flex-col shadow-none p-5">
        <DeleteDialog />
        <AppTable />
      </Card>
    </div>
  );
};

"use client";

import TeamTable from "@/components/shared/teams/teams-table";
import { Card } from "@/components/ui/card";
import { useUser } from "@/context/user-provider";
import useUserStore from "@/context/user-store";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const NEXT_PUBLIC_API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;

const Home = () => {
  const [isClient, setIsClient] = React.useState(false);

  const { user } = useUser();
  const { loadRoles, roles } = useUserStore();
  const fetchUsers = async () => {
    const response = await axios.get(
      `${NEXT_PUBLIC_API_DOMAIN}/api/v1/users/get-users`
    );
    // console.log(`response`, response.data);

    if (!response.data) {
      return toast({
        title: "Error",
        description: `Failed to load products`,
      });
    }
    return response.data;
  };
  useEffect(() => {
    setIsClient(true);
    fetchUsers();
  }, [user, isClient]);

  if (!isClient) {
    return null;
  }

  if (!roles) {
    redirect("/access-denied");
  }

  return (
    <div className="bg-secondary p-3 h-full">
      <Card className="flex flex-col shadow-none p-5">
        <TeamTable />
      </Card>
    </div>
  );
};

export default Home;

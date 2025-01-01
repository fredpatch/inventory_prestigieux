"use client";

import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API as string;

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signup = async (name: string, email: string, password: string) => {
  try {
    const response = await apiClient.post(`/api/v1/users/add-user`, {
      name,
      email,
      password,
    });

    if (response.status === 201) {
      toast({
        title: "Account created successfully",
        description: "You can now sign in",
      });

      return response.data;
    }
  } catch (error) {
    console.error("Failed to sign up:", error);
    toast({
      title: "Error",
      description: "Failed to sign up",
    });
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post(`/api/v1/users/login`, {
      email,
      password,
    });

    if (response.status === 201) {
      toast({
        title: "Login successful",
        description: "You are now signed in",
      });
      return response.data;
    } else {
      toast({
        title: "Error",
        description: `Failed to login: ${response.data.message}`,
      });
    }

    return null;
  } catch (error: any) {
    console.error("Failed to login:", error);
    toast({
      title: "Error",
      description: `${error.response.data.message}`,
    });
    throw error;
  }
};

export default apiClient;

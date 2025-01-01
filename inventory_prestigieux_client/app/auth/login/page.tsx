import { LoginForm } from "@/components/shared/auth/login-form";
import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-secondary p-6 md:p-10 h-full">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

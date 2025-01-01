import React from "react";
import { ToggleTheme } from "./toggle-theme";
import { AiFillProduct } from "react-icons/ai";
import { BsAirplane, BsAirplaneFill } from "react-icons/bs";

export default function AppHeader() {
  return (
    <div className="p-0 flex justify-between items-center ">
      <AppLogo />
      {/* <ToggleTheme /> */}
    </div>
  );
}

export const AppLogo = () => {
  return (
    <div className={`flex items-center gap-2 transition-all`}>
      <div
        className={`flex aspect-square size-6 items-center justify-center rounded-lg text-primary-foreground bg-primary`}
      >
        <BsAirplaneFill className="text-md" />
      </div>

      <div className="flex items-center gap-1 text-left text-sm leading-tight poppins">
        <span className="truncate font-semibold text-[15px]">
          Destock
        </span>
      </div>
    </div>
  );
};

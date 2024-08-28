"use client";

import { cn } from "lib/utils";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button
      className={cn("bg-red-800 px-5 py-1 rounded-md", className)}
      onClick={() => alert(`Hello from your ${appName} app!`)}>
      {children}
    </button>
  );
};

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props} data-oid="je.785i">
      <div suppressHydrationWarning data-oid="exvptzc">
        {children}
      </div>
    </NextThemesProvider>
  );
}

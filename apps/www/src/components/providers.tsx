"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Provider as BalancerProvider } from "react-wrap-balancer";
import { TooltipProvider } from "@dingify/ui/components/tooltip"

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <BalancerProvider>
        <TooltipProvider delayDuration={0}>
            {children}
        </TooltipProvider>
      </BalancerProvider>
    </NextThemesProvider>
  );
}

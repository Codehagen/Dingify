"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Onborda, OnbordaProvider, Step } from "onborda";
import { Provider as BalancerProvider } from "react-wrap-balancer";

import { TooltipProvider } from "@dingify/ui/components/tooltip";

import CustomCard from "./onboarding/CustomCard";

// Example steps array
const steps: Step[] = [
  {
    icon: <>👋</>,
    title: "Your Channels",
    content: (
      <>
        Define events that matter for you. If <b>Payments</b> are important.
        Make a channel named Payments{" "}
      </>
    ),
    selector: "#onborda-step1",
    side: "right",
    showControls: true,
    pointerPadding: -1,
    pointerRadius: 24,
  },
  {
    icon: <>🪄</>,
    title: "It's like magic!",
    content: (
      <>
        Onborda uses <b>framer-motion</b> to handle animations and{" "}
        <b>reactour</b> to handle the onboarding flow.
      </>
    ),
    selector: "#onborda-step2",
    side: "right",
    showControls: true,
    pointerPadding: 2,
    pointerRadius: 6,
  },
  {
    icon: <>🪄</>,
    title: "It's like magic!",
    content: (
      <>
        Onborda uses <b>framer-motion</b> to handle animations and{" "}
        <b>reactour</b> to handle the onboarding flow.
      </>
    ),
    selector: "#onborda-step3",
    side: "right",
    showControls: true,
    pointerPadding: 2,
    pointerRadius: 6,
  },
];

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <SessionProvider>
        <BalancerProvider>
          <TooltipProvider delayDuration={0}>
            <OnbordaProvider>
              <Onborda
                steps={steps}
                showOnborda={true}
                cardComponent={CustomCard}
                shadowOpacity="0.8"
              >
                {children}
              </Onborda>
            </OnbordaProvider>
          </TooltipProvider>
        </BalancerProvider>
      </SessionProvider>
    </NextThemesProvider>
  );
}

"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";

import { AnimatedBeam } from "../animate-beam";
import { Icons } from "../shared/icons";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

export function BeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);

  return (
    <section className="space-y-6 pb-12 pt-16 lg:py-6">
      <div className="container px-4 md:px-6">
        <div
          className="relative flex w-full max-w-[500px] items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:shadow-xl"
          ref={containerRef}
        >
          <div className="flex h-full w-full flex-col items-stretch justify-between gap-10">
            <div className="flex flex-row justify-between">
              <Circle ref={div1Ref}>
                <Icons.user className="text-black" />
              </Circle>
              <Circle ref={div2Ref}>
                <Icons.logo className="h-6 w-6" />
              </Circle>
            </div>
          </div>

          <AnimatedBeam
            duration={3}
            containerRef={containerRef}
            fromRef={div1Ref}
            toRef={div2Ref}
          />
        </div>
      </div>
    </section>
  );
}

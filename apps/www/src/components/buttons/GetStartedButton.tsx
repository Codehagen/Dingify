"use client";

import { useSigninModal } from "@/hooks/use-signin-modal";
import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "@dingify/ui/components/button";

export function GetStartedButton() {
  const signInModal = useSigninModal();

  return (
    <Button
      className={cn(buttonVariants({ size: "lg" }))}
      onClick={signInModal.onOpen}
    >
      Get started
    </Button>
  );
}

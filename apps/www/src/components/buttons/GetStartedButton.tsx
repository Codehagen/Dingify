"use client";

import { Button, buttonVariants } from "@dingify/ui/components/button";

import { cn } from "@/lib/utils";
import { useSigninModal } from "@/hooks/use-signin-modal";

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

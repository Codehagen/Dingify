"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Button, buttonVariants } from "@dingify/ui/components/button";

import { cn } from "@/lib/utils";
import { useSigninModal } from "@/hooks/use-signin-modal";

export function GetStartedButton() {
  const signInModal = useSigninModal();
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (!session) {
      signInModal.onOpen();
      return;
    }

    router.push("/dashboard");
  };

  return (
    <Button
      className={cn(buttonVariants({ size: "lg" }))}
      onClick={handleClick}
    >
      Get started
    </Button>
  );
}

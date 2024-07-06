"use client";

import { useRouter } from "next/navigation";

import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import { Separator } from "@dingify/ui/components/separator";
import { useStepper } from "@dingify/ui/components/stepper/use-stepper";

import { cn } from "@/lib/utils";


// should get the values, for now just handcoded.!
const exploreConfig = [
  {
    title: "Add Domain",
    description: "Verify and send emails from your own custom domains",
    buttonText: "Add Domain",
    href: "#",
  },
  {
    title: "Add Domain",
    description: "Verify and send emails from your own custom domains",
    buttonText: "Add Domain",
    href: "#",
  },
  {
    title: "Add Domain",
    description: "Verify and send emails from your own custom domains",
    buttonText: "Add Domain",
    href: "#",
  },
];

export default function ExploreMore() {
  const router = useRouter();
  const { activeStep } = useStepper();
  return (
    <Card className={cn(activeStep !== 3 && "opacity-65")}>
      <CardHeader>
        <CardTitle>Explore more</CardTitle>
        <CardDescription>
          Continue unlocking Dingify's full capabilities and setup
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-around gap-2">
          {exploreConfig.map((item) => (
            <Card className="flex max-w-60 flex-col items-start border-[1px]">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
                <Separator className="my-2" />
                <Button
                  onClick={() => router.push(item.href)}
                  className="self-start"
                  disabled={activeStep !== 3}
                >
                  {item.buttonText}
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

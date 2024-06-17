"use client";

import type { CardComponentProps } from "onborda";
import React from "react";
import confetti from "canvas-confetti";
import { XIcon } from "lucide-react";
import { useOnborda } from "onborda";

import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";

const CustomCard: React.FC<CardComponentProps> = ({
  step,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  arrow,
}) => {
  // Onborda hooks
  const { closeOnborda } = useOnborda();

  function handleConfetti() {
    closeOnborda();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  return (
    <Card className="max-w-vw rounded-3xl border-0">
      <CardHeader>
        <div className="flex w-full items-start justify-between">
          <div>
            <CardTitle className="mb-2 text-lg">
              {step.icon} {step.title}
            </CardTitle>
            <CardDescription>
              {currentStep + 1} of {totalSteps}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={() => closeOnborda()}>
            <XIcon size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>{step.content}</CardContent>
      <CardFooter>
        <div className="flex w-full justify-between">
          {currentStep !== 0 && (
            <Button onClick={() => prevStep()}>Previous</Button>
          )}
          {currentStep + 1 !== totalSteps && (
            <Button onClick={() => nextStep()} className="ml-auto">
              Next
            </Button>
          )}
          {currentStep + 1 === totalSteps && (
            <Button onClick={() => handleConfetti()} className="ml-auto">
              🎉 Finish!
            </Button>
          )}
        </div>
      </CardFooter>
      <span className="text-card">{arrow}</span>
    </Card>
  );
};

export default CustomCard;

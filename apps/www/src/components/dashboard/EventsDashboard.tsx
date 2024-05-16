"use client";

import { useState } from "react";

import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@dingify/ui/components/dropdown-menu";
import { Separator } from "@dingify/ui/components/separator";

import EventsDashboardCards from "./EventsDashboardComponents/EventsDashboardCards";
import EventsDashboardDetails from "./EventsDashboardComponents/EventsDashboardDetails";
import EventsDashboardTable from "./EventsDashboardComponents/EventsDashboardTable";

const mockEvents = [
  {
    id: "1",
    channel: "New-channel-name",
    event: "new-payment",
    projectName: "ProjectName",
    name: "You got a new payment",
    userId: "user-123",
    icon: "🎉",
    notify: true,
    amount: "$150.00",
    createdAt: "2024-05-16T05:49:41.185Z",
  },
  {
    id: "2",
    channel: "Another-channel",
    event: "new-message",
    projectName: "ProjectName",
    name: "New message received",
    userId: "user-456",
    icon: "💬",
    notify: false,
    amount: "$0.00",
    createdAt: "2024-05-16T06:00:00.000Z",
  },
  {
    id: "3",
    channel: "Third-channel",
    event: "new-task",
    projectName: "ProjectName",
    name: "New task assigned",
    userId: "user-789",
    icon: "📝",
    notify: false,
    amount: "$0.00",
    createdAt: "2024-05-16T06:15:30.500Z",
  },
];

export default function EventsDashboard() {
  const [selectedEventId, setSelectedEventId] = useState(mockEvents[0]?.id);

  const selectedEvent = mockEvents.find(
    (event) => event.id === selectedEventId,
  );
  return (
    <main className="grid flex-1 items-start gap-4 p-4 pl-0 pr-0 sm:px-0 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <EventsDashboardCards />
        </div>
        <EventsDashboardTable
          events={mockEvents}
          setSelectedEventId={setSelectedEventId}
          selectedEventId={selectedEventId}
        />
      </div>
      <div>
        {selectedEvent ? (
          <EventsDashboardDetails event={selectedEvent} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Event Selected</CardTitle>
              <CardDescription>Select an event to see details</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Please click on an event row to view the details.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";

import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
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

export default function EventsDashboard({ events }) {
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id);

  const selectedEvent = events.find((event) => event.id === selectedEventId);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 pl-0 pr-0 sm:px-0 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <EventsDashboardCards />
        </div>
        <EventsDashboardTable
          events={events}
          setSelectedEventId={setSelectedEventId}
          selectedEventId={selectedEventId}
        />
      </div>
      <div>
        <EventsDashboardDetails event={selectedEvent} />
      </div>
    </main>
  );
}

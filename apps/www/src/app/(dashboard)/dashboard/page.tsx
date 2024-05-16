import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserCredits } from "@/actions/get-credits";

import { Button } from "@dingify/ui/components/button";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { AddApiKeyButton } from "@/components/buttons/AddApiKeyButton";
import { AddPropertyButton } from "@/components/buttons/AddPropertyButton";
import EventsDashboard from "@/components/dashboard/EventsDashboard";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import PropertiesTable from "@/components/properties/Propertiestable";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { columns, Payment } from "@/components/table/dashboard/columns";
import { DataTable } from "@/components/table/dashboard/data-table";

export const metadata = {
  title: "Dingify Dashboard - Your Alerts Overview",
  description:
    "Monitor and analyze all your critical events in real-time. Access key metrics, track important journeys, and make data-driven decisions to optimize your business performance on the Dingify Dashboard.",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const userCredits = await getUserCredits();

  if (!user) {
    redirect(authOptions.pages?.signIn || "/login");
  }

  // Fetch projects associated with the user
  const projects = await prisma.project.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
    },
  });

  // Extract project IDs
  const projectIds = projects.map((project) => project.id);

  // Fetch channels for the user's projects
  const channels = await prisma.channel.findMany({
    where: {
      projectId: {
        in: projectIds,
      },
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log("Channels:", channels); // Debugging line to print the channels

  // Ensure userCredits.credits is defined, default to 0 if undefined
  const availableCredits = userCredits.credits ?? 0;

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Your analytics dashboard">
        {userCredits.success && availableCredits > 0 ? (
          <AddPropertyButton />
        ) : (
          <Button disabled variant="outline">
            Add Credits to Add Channel
          </Button>
        )}
      </DashboardHeader>
      <div>
        {channels.length === 0 ? (
          // Render EmptyPlaceholder if there are no channels
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>
              There are no channels
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You need to generate an API key first
            </EmptyPlaceholder.Description>
            <AddApiKeyButton />
          </EmptyPlaceholder>
        ) : (
          // Render EventsTable if there are Events
          <EventsDashboard />
          // <PropertiesTable properties={properties} />
        )}
      </div>
    </DashboardShell>
  );
}

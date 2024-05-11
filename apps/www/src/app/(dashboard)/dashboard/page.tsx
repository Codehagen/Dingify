import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserCredits } from "@/actions/get-credits";
import { AddApiKeyButton } from "@/components/buttons/AddApiKeyButton";
import { AddPropertyButton } from "@/components/buttons/AddPropertyButton";
import { LanugageButton } from "@/components/buttons/LanguageButton";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import PropertiesTable from "@/components/properties/Propertiestable";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { columns, Payment } from "@/components/table/dashboard/columns";
import { DataTable } from "@/components/table/dashboard/data-table";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";

import { prisma } from "@dingify/db";
import { Button } from "@dingify/ui/components/button";

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

  const properties = await prisma.property.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      address: true,
      createdAt: true,
      status: true,
      label: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Ensure userCredits.credits is defined, default to 0 if undefined
  const availableCredits = userCredits.credits ?? 0;

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Your analytics dashboard">
        {userCredits.success && availableCredits > 0 ? (
          <AddPropertyButton />
        ) : (
          <Button disabled variant="outline">
            Add Credits to Add Properties
          </Button>
        )}
      </DashboardHeader>
      <div>
        {properties.length === 0 ? (
          // Render EmptyPlaceholder if there are no properties
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>There is no events</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You need to generate a API key first
            </EmptyPlaceholder.Description>
            {/* <Link href="/property" passHref className="mb-4">
              <Button variant="outline">Add your first property</Button>
            </Link> */}
            {/* <LanugageButton userId={user.id} /> */}
            <AddApiKeyButton />
          </EmptyPlaceholder>
        ) : (
          // Render PropertiesTable if there are properties
          <DataTable columns={columns} data={properties} />
          // <PropertiesTable properties={properties} />
        )}
      </div>
    </DashboardShell>
  );
}

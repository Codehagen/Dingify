import { getCustomerDetails } from "@/actions/get-customer-details";

import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import NoPhotoPlaceholder from "@/components/properties/NoPhotoPlaceholder copy";

export default async function UserPage({ params }: { params: { id: string } }) {
  const customerId = params.id;

  console.log("Customer ID from params:", customerId); // Debugging log

  if (!customerId) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Customer not found"
          text="Invalid customer ID."
        />
      </DashboardShell>
    );
  }

  try {
    const customerDetails = await getCustomerDetails(customerId);
    console.log("Customer details:", customerDetails); // Debugging log

    if (!customerDetails) {
      return (
        <DashboardShell>
          <DashboardHeader
            heading="Customer not found"
            text="We couldn't find the customer you're looking for."
          />
          <NoPhotoPlaceholder />
        </DashboardShell>
      );
    }

    if (customerDetails.events.length === 0) {
      return (
        <DashboardShell>
          <DashboardHeader
            heading={customerDetails.name || "Unnamed Customer"}
            text="This customer has no events yet."
          />
          <NoPhotoPlaceholder />
        </DashboardShell>
      );
    }

    return (
      <DashboardShell>
        <DashboardHeader
          heading={customerDetails.name || "Unnamed Customer"}
          text="Customer details and events"
        />
        <div>Here we will put the new component</div>
      </DashboardShell>
    );
  } catch (error) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Error" text={error.message} />
      </DashboardShell>
    );
  }
}

import { prisma } from "@/lib/db";

export async function getCustomerDetails(customerId: string) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        events: true, // Include events related to the customer
      },
    });

    return customer;
  } catch (error) {
    console.error("Error fetching customer details:", error);
    throw error;
  }
}

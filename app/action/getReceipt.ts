import prisma from "@/app/lib/prismadb";
import { SafeRental } from "../types";

interface IParams {
  rentId?: string;
}

export default async function getReceipt(params: IParams) {
  try {
    const { rentId } = await params;

    const rentals = await prisma.rental.findMany({
      where: {
        id: rentId,
      },
      include: {
        user: true,
        listing: true,
      },
    });

    const safeRental: SafeRental[] = rentals.map((rental) => ({
      ...rental,
      createdAt: rental.createdAt.toISOString(),
      startDate: rental.startDate.toISOString(),
      endDate: rental.endDate.toISOString(),
      listing: {
        ...rental.listing,
        createdAt: rental.listing.createdAt.toISOString(),
      },
      user: rental.user
        ? {
            ...rental.user,
            createdAt: rental.user.createdAt.toISOString(),
            updatedAt: rental.user.updatedAt.toISOString(),
            emailVerified: rental.user.emailVerified
              ? rental.user.emailVerified.toISOString()
              : null,
          }
        : null,
    }));

    return safeRental;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
}

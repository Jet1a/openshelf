import prisma from "@/app/lib/prismadb";
import { SafeRental } from "../types";

interface IParams {
  bookId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getRental(params: IParams) {
  try {
    const { bookId, userId, authorId } = await params;

    const query: {
      bookId?: string;
      userId?: string;
      listing?: { userId: string };
    } = {};

    if (bookId) {
      query.bookId = bookId;
    }
    if (userId) {
      query.userId = userId;
    }
    if (authorId) {
      query.listing = { userId: authorId };
    }

    const rentals = await prisma.rental.findMany({
      where: query,
      include: {
        listing: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
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

import prisma from "@/app/lib/prismadb";
import { Prisma } from "@prisma/client";

export interface IListingParams {
  userId?: string;
  category?: string;
}

export default async function getListings(params: IListingParams) {
  try {
    const { userId, category } = await params;

    const query: Prisma.ListingWhereInput = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeListings;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

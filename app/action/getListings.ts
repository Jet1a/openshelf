import prisma from "@/app/lib/prismadb";
import { Prisma } from "@prisma/client";

export interface IListingParams {
  userId?: string;
  category?: string;
  page?: number;
  limit?: number;
  search?: string;
  sorted?: string;
}

export default async function getListings(params: IListingParams) {
  try {
    const { userId, category, page = 1, limit = 18, search, sorted } = params;

    const query: Prisma.ListingWhereInput = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (search) {
      query.title = { contains: search, mode: "insensitive" };
    }

    const orderBy =
      sorted === "title"
        ? { title: "asc" as Prisma.SortOrder }
        : { createdAt: "desc" as Prisma.SortOrder };

    const skip = (page - 1) * limit;

    const [listings, totalCount] = await Promise.all([
      prisma.listing.findMany({
        where: query,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.listing.count({
        where: query,
      }),
    ]);

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return { listings: safeListings, totalCount };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

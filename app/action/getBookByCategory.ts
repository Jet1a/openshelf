import prisma from "@/app/lib/prismadb";

interface IParams {
  bookId?: string;
}

export default async function getBookByCategory(
  category: string | undefined,
  params: IParams
) {
  try {
    const { bookId } = await params;

    let listings = await prisma.listing.findMany({
      where: {
        category: category,
        id: {
          not: bookId,
        },
      },
    });

    if (listings.length < 6) {
      const additionalListings = await prisma.listing.findMany({
        where: {
          category: {
            not: category,
          },
          id: {
            notIn: [bookId ?? "", ...listings.map((listing) => listing.id)],
          },
        },
        take: 6 - listings.length,
      });

      listings = [...listings, ...additionalListings];
    }

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

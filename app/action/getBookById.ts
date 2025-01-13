import prisma from "@/app/lib/prismadb";

interface IParams {
  bookId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { bookId } = await params;
    const book = await prisma.listing.findUnique({
      where: {
        id: bookId,
      },
      include: {
        user: true,
      },
    });

    if (!book) {
      return null;
    }

    return {
      ...book,
      createdAt: book.createdAt.toISOString(),
      user: {
        ...book.user,
        createdAt: book.user.createdAt.toISOString(),
        updatedAt: book.user.updatedAt.toISOString(),
        emailVerified: book.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

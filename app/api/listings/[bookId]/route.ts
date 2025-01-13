import { NextResponse } from "next/server";
import getCurrentUser from "@/app/action/getCurrentUser";
import prisma from "@/app/lib/prismadb";

interface IParams {
  bookId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { bookId } = await params;

  if (!bookId || typeof bookId !== "string") {
    throw new Error("Invalid ID");
  }

  const book = await prisma.listing.deleteMany({
    where: {
      id: bookId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(book);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { bookId } = await params;

  if (!bookId || typeof bookId !== "string") {
    return NextResponse.error();
  }

  const {
    title,
    author,
    imageSrc,
    description,
    published,
    isbn,
    category,
    page,
    imprint,
  } = await request.json();

  const updatedBook = await prisma.listing.update({
    where: {
      id: bookId,
      userId: currentUser.id,
    },
    data: {
      title,
      description,
      imageSrc,
      category,
      page: parseInt(page, 10),
      author,
      isbn: parseInt(isbn, 10),
      imprint,
      published,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(updatedBook);
}

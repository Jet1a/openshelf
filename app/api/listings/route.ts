import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/action/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  console.log(body);

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
  } = body;

  const listing = await prisma.listing.create({
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

  return NextResponse.json(listing);
}

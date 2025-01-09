import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/action/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { bookId, startDate, endDate } = body;

  if (!bookId || !startDate || !endDate) {
    return NextResponse.error();
  }

  const listingAndRental = await prisma.listing.update({
    where: {
      id: bookId,
    },
    data: {
      rental: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
        },
      },
    },
  });

  return NextResponse.json(listingAndRental);
}

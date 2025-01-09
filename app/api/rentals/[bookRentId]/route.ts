import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/action/getCurrentUser";

interface IParams {
  bookRentId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { bookRentId } = await params;

  if (!bookRentId || typeof bookRentId !== "string") {
    throw new Error("Invalid ID");
  }

  const rental = await prisma.rental.deleteMany({
    where: {
      id: bookRentId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(rental);
}

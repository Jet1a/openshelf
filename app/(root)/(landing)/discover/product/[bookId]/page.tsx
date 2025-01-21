import getBookById from "@/app/action/getBookById";
import getCurrentUser from "@/app/action/getCurrentUser";
import getRental from "@/app/action/getRental";
import BookClient from "@/app/components/pages/BookClient";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import React from "react";
import getBookByCategory from "@/app/action/getBookByCategory";

interface IParams {
  bookId?: string;
}

const BookPage = async (props: { params: Promise<IParams> }) => {
  const params = await props.params;
  const book = await getBookById(params);
  const rentals = await getRental(params);
  const currentUser = await getCurrentUser();

  const listings = await getBookByCategory(book?.category, params);

  if (!book) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <BookClient
        book={book}
        currentUser={currentUser}
        rentals={rentals}
        listings={listings}
      />
    </ClientOnly>
  );
};

export default BookPage;

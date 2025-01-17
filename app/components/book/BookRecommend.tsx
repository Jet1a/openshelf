import React from "react";
import Heading from "../Heading";
import BookCard from "./BookCard";
import { SafeListing, SafeUser } from "@/app/types";

interface BookRecommendProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const BookRecommend = ({ listings, currentUser }: BookRecommendProps) => {
  return (
    <div className="pt-8 max-w-[2520px] mx-auto px-2">
      <Heading
        title="Books you may like"
        subtitle="books that similar to this book"
      />
      <div className="pt-6 overflow-x-auto">
        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-8">
          {listings.map((listing: SafeListing) => {
            return (
              <BookCard
                key={listing.id}
                currentUser={currentUser}
                data={listing}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookRecommend;

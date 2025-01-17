"use client";

import { SafeListing, SafeUser } from "@/app/types";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import ClientOnly from "../ClientOnly";
import Container from "../Container";
import EmptyState from "../EmptyState";
import BookCard from "../book/BookCard";

interface DiscoverClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const DiscoverClient = ({ listings, currentUser }: DiscoverClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams?.get("search") || "";
  const sorted = searchParams?.get("sorted");

  if (sorted === "title") {
    listings = listings.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  }

  const filteredListings = listings.filter((listing) =>
    listing.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSortedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(window.location.search);
    params.set("sorted", e.target.value);
    router.replace(`/discover?${params.toString()}`);
  };

  if (filteredListings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No exact matches" showReset />
      </ClientOnly>
    );
  }

  return (
    <main>
      <Container>
        <div className="pt-6 flex items-center justify-between gap-4">
          <h1 className="text-lg sm:text-2xl font-semibold">What&apos;s New?</h1>
          <div className="flex items-center justify-center">
            <span>Sorted By:</span>
            <select
              onChange={handleSortedChange}
              id="sort"
              name="sort"
              className="border-2 rounded-md ml-2 cursor-pointer focus:outline-none"
            >
              <option className="cursor-pointer" value="recently">
                Recently Added
              </option>
              <option className="cursor-pointer" value="title">
                Title a-z
              </option>
            </select>
          </div>
        </div>

        <article className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-8">
          {filteredListings.map((listing: SafeListing) => {
            return (
              <BookCard
                key={listing.id}
                currentUser={currentUser}
                data={listing}
              />
            );
          })}
        </article>
      </Container>
    </main>
  );
};

export default DiscoverClient;

"use client";

import { SafeListing, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import React from "react";
import ClientOnly from "../ClientOnly";
import Container from "../Container";
import EmptyState from "../EmptyState";
import BookCard from "../book/BookCard";
import DiscoverPagination from "../DiscoverPagination";
import Search from "../header/Search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DiscoverClientProps {
  listings: SafeListing[];
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  currentUser?: SafeUser | null;
}

const DiscoverClient = ({
  listings,
  currentUser,
  totalCount,
  currentPage,
  itemsPerPage,
}: DiscoverClientProps) => {
  const router = useRouter();

  const filteredListings = listings;

  const handleSortedChange = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("sorted", value);
    params.set("page", "1");
    router.replace(`/discover?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
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
        <div className="sm:pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">What&apos;s New?</h1>
          <div className="flex sm:hidden">
            <Search />
          </div>
          <Select onValueChange={handleSortedChange} defaultValue="recently">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sorted" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recently">Recently added</SelectItem>
              <SelectItem value="title">Title A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <article className="pt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-8">
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
        <DiscoverPagination
          currentPage={currentPage}
          totalItems={totalCount}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </Container>
    </main>
  );
};

export default DiscoverClient;

import getCurrentUser from "@/app/action/getCurrentUser";
import getListings, { IListingParams } from "@/app/action/getListings";
import BookCard from "@/app/components/book/BookCard";
import Categories from "@/app/components/Categories";
import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import { SafeListing } from "@/app/types";
import React from "react";

interface DiscoverPageProps {
  searchParams: IListingParams;
}

const DiscoverPage = async ({ searchParams }: DiscoverPageProps) => {

  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <Categories />
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <article>
        <Categories />
        <Container>
          <h1 className="pt-6 text-2xl font-semibold">What&apos;s New?</h1>
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
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
        </Container>
      </article>
    </ClientOnly>
  );
};

export default DiscoverPage;

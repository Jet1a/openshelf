import Link from "next/link";
import React from "react";
import Container from "../Container";
import CarouselHome from "../CarouselHome";
import { SafeListing, SafeUser } from "@/app/types";
import BookCard from "../book/BookCard";
import Image from "next/image";
import reading from "@/public/images/reading.png";

interface HomeClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const HomeClient = ({ listings, currentUser }: HomeClientProps) => {
  return (
    <main className="min-h-screen">
      <CarouselHome />
      <article>
        <Container>
          <div className="flex justify-between items-center pt-6">
            <span className="text-2xl font-semibold">New Arrivals</span>
            <span className="text-sm text-neutral-400 underline hover:opacity-70">
              <Link href={"/discover"}>View all products</Link>
            </span>
          </div>
          <div className="overflow-x-auto pt-6">
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
          <article className="my-6 max-w-[70vw] mx-auto border-2 p-6  rounded-xl border-orange-400">
            <div className="flex flex-col flex-wrap  sm:flex-row items-center justify-center">
              <div className="flex sm:w-[500px] sm:items-start sm:justify-start text-center justify-center items-center md:text-start flex-col space-y-2 text-orange-400">
                <span className="font-light text-[14px] sm:text-[24px]">
                  Openshelf Subscriptions
                </span>
                <h1 className="font-bold text-[35px] sm:text-[60px] leading-none">
                  Montly <br /> Subscription <br /> Service
                </h1>
                <span className="font-light text-[14px] sm:text-[24px]">
                  Monthly personalised subscription service, to your door for 6
                  or 12 months.
                </span>
              </div>
              <div className="relative h-[200px] w-[200px] sm:w-[400px] sm:h-[400px]">
                <Image
                  src={reading}
                  alt="subscription"
                  fill
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </article>
        </Container>
      </article>
    </main>
  );
};

export default HomeClient;

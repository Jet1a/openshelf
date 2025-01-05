import Image from "next/image";
import getNewListings from "../action/getNewListings";
import BookCard from "../components/book/BookCard";
import Container from "../components/Container";
import CarouselHome from "../components/home/CarouselHome";
import reading from "@/public/images/reading.png";
import Link from "next/link";
import { Listing } from "@prisma/client";

export default async function Home() {
  const listings = await getNewListings();

  return (
    <main>
      <CarouselHome />
      <article>
        <Container>
          <div className="flex justify-between items-center pt-6">
            <span className="text-2xl font-semibold">New Arrivals</span>
            <span className="text-sm text-neutral-400 underline hover:opacity-70">
              <Link href={"/discover"}>View all products</Link>
            </span>
          </div>
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listing: Listing) => {
              return <BookCard key={listing.id} data={listing} />;
            })}
          </div>
          <div className="my-6 max-w-[70vw] mx-auto border-2 rounded-xl border-orange-400">
            <div className="flex flex-col flex-wrap  sm:flex-row items-center justify-center">
              <div className="flex sm:items-start sm:justify-start text-center justify-center items-center md:text-start flex-col p-6 space-y-2 text-orange-400">
                <span className="font-light text-[14px]">
                  Openshelf Subscriptions
                </span>
                <h1 className="font-bold text-[60px] leading-none">
                  Montly <br /> Subscription <br /> Service
                </h1>
                <span className="font-light text-[14px]">
                  Monthly personalised subscription service, to your door for 6
                  or 12 months.
                </span>
              </div>
              <div className="relative w-[400px] h-[400px]">
                <Image
                  src={reading}
                  alt="subscription"
                  fill
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </Container>
      </article>
    </main>
  );
}

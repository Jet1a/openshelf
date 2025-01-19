import { SafeRental, SafeUser } from "@/app/types";
import React from "react";
import Logo from "../header/Logo";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import ReceiptDetail from "../ReceiptDetail";

interface ReceiptClientProps {
  rentals: SafeRental[];
  currentUser?: SafeUser | null;
}

const ReceiptClient = ({ rentals }: ReceiptClientProps) => {
  const formatCreatedDate = (createdAt: string) => {
    const start = new Date(createdAt);

    return format(start, "EEE, MMMM d, yyyy · pp");
  };

  const formatRentalDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-orange-400/80">
      <div className="w-full my-4 max-w-[300px] sm:max-w-[400px] mx-auto drop-shadow-book rounded-t-lg p-4 bg-white">
        {rentals.map((rental: SafeRental) => (
          <div
            key={rental.id}
            className="flex flex-col items-center justify-center space-y-2"
          >
            <div className="text-center text-sm">
              <Logo />
              <span>{formatCreatedDate(rental.createdAt)}</span>
            </div>
            <Image
              src={rental.listing.imageSrc}
              alt="receipt book"
              width={200}
              height={200}
              className="object-contain"
            />
            <div className="w-full border-b-2 border-dashed" />
            <div className="flex flex-col w-full text-sm font-light space-y-2">
              {/* Receipt details */}
              <ReceiptDetail title="Rental Number" value={rental.id} />
              <ReceiptDetail
                title="Rent Date"
                value={formatRentalDate(rental.startDate, rental.endDate)}
              />
            </div>
            <div className="w-full border-b-2 border-dashed" />
            <div className="flex flex-col w-full text-sm font-light space-y-2">
              <ReceiptDetail title="Book ISBN" value={rental.listing.isbn} />
              <ReceiptDetail title="Book Title" value={rental.listing.title} />
            </div>
            <div className="w-full border-b-2 border-dashed" />
            <div className="flex flex-col w-full text-sm font-light space-y-2">
              <ReceiptDetail title="Customer Number" value={rental.user?.id} />
              <ReceiptDetail title="Customer Name" value={rental.user?.name} />
              <ReceiptDetail
                title="Customer Email"
                value={rental.user?.email}
              />
            </div>
            <div className="w-full border-b-2 border-dashed" />
          </div>
        ))}
        <div className="text-center text-xs font-light space-y-1 pt-2">
          <p>Thank you for choosing OpenShelf! We hope you enjoy your book.</p>
          <p>Please return books on time to help us serve others better!</p>
          <p>
            <Link
              href={"/mybooks"}
              className="cursor-pointer hover:font-semibold underline"
            >
              Back to Website
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReceiptClient;

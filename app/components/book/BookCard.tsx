"use client";

import { SafeUser } from "@/app/types";
import { Listing, Rental } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface BookCardProps {
  data: Listing;
  rental?: Rental;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const BookCard = ({
  data,
  rental,
  onAction,
  disabled,
  actionId = "",
  actionLabel,
  currentUser,
}: BookCardProps) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, disabled, actionId]
  );

  const rentalDate = useMemo(() => {
    if (!rental) {
      return null;
    }
    const start = new Date(rental.startDate);
    const end = new Date(rental.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [rental]);

  return (
    <div
      onClick={() => router.push(`/discover/product/${data.id}`)}
      className="col-span-1 cursor-pointer"
    >
      <div className="flex flex-col space-y-1 w-full text-center">
        <div className="h-[300px] w-full relative border rounded-lg overflow-hidden shadow-sm">
          <Image
            src={data.imageSrc}
            alt={data.title}
            fill
            className="object-contain py-4 h-full w-full hover:scale-105 transition duration-300 ease-in-out"
          />
          <div className="absolute top-5 right-5">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-md">{data.title}</div>
        <div className="font-light text-sm">
          <span>by {data.author}</span>
        </div>
        <div className="font-light text-neutral-500 text-xs">
          {rentalDate || data.category}
        </div>
        {onAction && actionLabel && (
          <Button
            disable={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default BookCard;

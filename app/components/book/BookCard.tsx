"use client";

import { SafeListing, SafeRental, SafeUser } from "@/app/types";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "../Button";
import HeartButton from "../HeartButton";

interface BookCardProps {
  data: SafeListing;
  rental?: SafeRental;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  secondaryLabel?: string;
  onSecondaryAction?: (listing: SafeListing) => void;
  currentUser?: SafeUser | null;
  rentUser?: SafeUser | null;
}

const BookCard = ({
  data,
  rental,
  onAction,
  disabled,
  actionId = "",
  actionLabel,
  secondaryLabel,
  onSecondaryAction,
  currentUser,
  rentUser,
}: BookCardProps) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const pathname = window.location.pathname;

  useEffect(() => {
    if (pathname !== "/rented") {
      setIsClient(true);
    }
  }, [pathname]);

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

  const handleEdit = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (disabled) {
        return;
      }

      onSecondaryAction?.(data);
    },
    [onSecondaryAction, disabled, data]
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
      <div className="flex flex-col space-y-1 w-full text-center h-full">
        <div className="h-[300px] w-full relative border rounded-lg overflow-hidden shadow-sm">
          <Image
            src={data.imageSrc}
            alt={data.title}
            fill
            className="object-contain py-4 h-full w-full hover:scale-105 transition duration-300 ease-in-out"
          />
          <div className="absolute top-5 right-5">
            <HeartButton bookId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-md">{data.title}</div>
          <div className="font-light text-sm">
            <span>by {data.author}</span>
          </div>
          <div className="font-light text-neutral-500 text-sm">
            {rentalDate || data.category}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 pt-2">
          {onAction && actionLabel && (
            <Button
              disable={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
          {onSecondaryAction && secondaryLabel && (
            <Button
              disable={disabled}
              small
              label={secondaryLabel}
              onClick={handleEdit}
            />
          )}
        </div>
        {!isClient && (
          <span className="font-light text-neutral-500 text-xs">
            ( rent by {rentUser?.email} )
          </span>
        )}
      </div>
    </div>
  );
};

export default BookCard;

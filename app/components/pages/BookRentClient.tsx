"use client";
import { SafeRental, SafeUser } from "@/app/types";
import React, { useCallback, useState } from "react";
import Container from "../Container";
import Heading from "../Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import BookCard from "../book/BookCard";

interface BookRentClientProps {
  rentals: SafeRental[];
  currentUser?: SafeUser | null;
}

const BookRentClient = ({ rentals, currentUser }: BookRentClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/rentals/${id}`)
        .then(() => {
          toast.success("Rent cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  const onReceipt = useCallback(
    (rentalId: string) => {
      router.push(`/receipt/${rentalId}`);
    },
    [router]
  );

  return (
    <Container>
      <div className="pt-6" />
      <Heading
        title="My Books"
        subtitle="What you've rent and when you're returned"
      />
      <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-8">
        {rentals.map((rental: SafeRental) => (
          <BookCard
            key={rental.id}
            data={rental.listing}
            rental={rental}
            actionId={rental.id}
            onAction={onCancel}
            actionLabel="Cancel rent"
            onSecondaryAction={onReceipt}
            secondaryLabel="Receipt details"
            currentUser={currentUser}
            disabled={deletingId === rental.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default BookRentClient;

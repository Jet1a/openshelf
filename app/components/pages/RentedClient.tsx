"use client";

import { SafeRental, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import Container from "../Container";
import Heading from "../Heading";
import axios from "axios";
import toast from "react-hot-toast";
import BookCard from "../book/BookCard";

interface RentedClientProps {
  rentals: SafeRental[];
  currentUser?: SafeUser | null;
}

const RentedClient = ({ rentals, currentUser }: RentedClientProps) => {
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
          toast.error("Something went wrong.");
          console.log(error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <div className="pt-6">
        <Heading
          title="Rental History"
          subtitle="List of books that have been rent"
        />
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {rentals.map((rental: SafeRental) => (
            <BookCard
              key={rental.id}
              data={rental.listing}
              rental={rental}
              actionId={rental.id}
              onAction={onCancel}
              actionLabel="Cancel guest rental"
              currentUser={currentUser}
              disabled={deletingId === rental.id}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default RentedClient;

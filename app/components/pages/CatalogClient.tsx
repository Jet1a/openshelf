"use client";
import { SafeListing, SafeUser } from "@/app/types";
import { useCallback, useState } from "react";
import Heading from "../Heading";
import BookCard from "../book/BookCard";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Container from "../Container";
import useAddModal from "@/app/hook/useAddModal";
import AddModal from "../modal/AddModal";

interface CatalogClientProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

const CatalogClient = ({ listings, currentUser }: CatalogClientProps) => {
  const router = useRouter();
  const addModal = useAddModal();
  const [deletingId, setDeletingId] = useState("");
  const [editingBook, setEditingBook] = useState<SafeListing | null>(null);

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Book Removed");
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

  const onEdit = useCallback(
    (listing: SafeListing) => {
      setEditingBook(listing);
      addModal.onOpen();
    },
    [addModal]
  );

  return (
    <Container>
      <div className="pt-6" />
      <div className="flex items-center justify-between">
        <Heading title="Book Catalog" subtitle="List of your books" />
        <span className="font-light text-neutral-500">
          Total books: {listings.length}
        </span>
      </div>

      <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-8">
        {listings.map((listing: SafeListing) => (
          <BookCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            disabled={deletingId === listing.id}
            onAction={onCancel}
            actionLabel="Remove book"
            secondaryLabel="Edit book"
            onEditAction={onEdit}
            currentUser={currentUser}
          />
        ))}
      </div>
      <AddModal initialsValues={editingBook} />
    </Container>
  );
};

export default CatalogClient;

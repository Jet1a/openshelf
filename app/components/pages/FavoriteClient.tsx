import { SafeListing, SafeUser } from "@/app/types";
import React from "react";
import Container from "../Container";
import Heading from "../Heading";
import BookCard from "../book/BookCard";

interface FavoriteClientProps {
  favorites: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavoriteClient = ({ favorites, currentUser }: FavoriteClientProps) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of books you have favorited!" />
      <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {favorites.map((favorite: SafeListing) => (
          <BookCard
            key={favorite.id}
            data={favorite}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoriteClient;

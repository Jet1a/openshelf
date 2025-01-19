export const dynamic = "force-dynamic";

import getCurrentUser from "@/app/action/getCurrentUser";
import getFavoriteBooks from "@/app/action/getFavoriteBooks";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import FavoriteClient from "@/app/components/pages/FavoriteClient";
import React from "react";

const FavoritePage = async () => {
  const favorites = await getFavoriteBooks();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  if (favorites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites"
          subtitle="Try add some books you're interested"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className="pt-6">
        <FavoriteClient favorites={favorites} currentUser={currentUser} />
      </div>
    </ClientOnly>
  );
};

export default FavoritePage;

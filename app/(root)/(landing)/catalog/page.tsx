export const dynamic = "force-dynamic";

import getCurrentUser from "@/app/action/getCurrentUser";
import getListings from "@/app/action/getListings";
import Categories from "@/app/components/Categories";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import CatalogClient from "@/app/components/pages/CatalogClient";
import React from "react";

const CatalogPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.listings.length === 0) {
    return (
      <ClientOnly>
        <Categories />
        <EmptyState
          title="No catalog found"
          subtitle="Looks like you haven't created once."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <CatalogClient listings={listings.listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default CatalogPage;

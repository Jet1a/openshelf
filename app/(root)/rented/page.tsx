import getCurrentUser from "@/app/action/getCurrentUser";
import getRental from "@/app/action/getRental";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import RentedClient from "@/app/components/pages/RentedClient";
import React from "react";

const RentedBookPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const rentals = await getRental({
    authorId: currentUser.id,
  });

  if (rentals.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No rentals found"
          subtitle="Look like there's no rentals right now"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <RentedClient rentals={rentals} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default RentedBookPage;

export const dynamic = "force-dynamic";

import getCurrentUser from "@/app/action/getCurrentUser";
import getRental from "@/app/action/getRental";
import BookRentClient from "@/app/components/pages/BookRentClient";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

const MybookPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const rentals = await getRental({
    userId: currentUser.id,
  });

  if (rentals.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No books found"
          subtitle="Try discover and borrowed some of our book!"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <BookRentClient rentals={rentals} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default MybookPage;

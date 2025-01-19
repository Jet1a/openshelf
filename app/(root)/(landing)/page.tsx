export const dynamic = "force-dynamic";

import getNewListings from "../../action/getNewListings";
import getCurrentUser from "../../action/getCurrentUser";
import ClientOnly from "../../components/ClientOnly";
import EmptyState from "../../components/EmptyState";
import HomeClient from "../../components/pages/HomeClient";

export default async function Home() {
  const listings = await getNewListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <HomeClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
}

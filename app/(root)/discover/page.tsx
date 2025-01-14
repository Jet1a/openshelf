export const dynamic = "force-dynamic";

import getCurrentUser from "@/app/action/getCurrentUser";
import getListings, { IListingParams } from "@/app/action/getListings";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import DiscoverClient from "@/app/components/pages/DiscoverClient";

interface DiscoverPageProps {
  searchParams: IListingParams;
}

const DiscoverPage = async ({ searchParams }: DiscoverPageProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <DiscoverClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default DiscoverPage;

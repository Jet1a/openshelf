export const dynamic = "force-dynamic";

import getCurrentUser from "@/app/action/getCurrentUser";
import getListings, { IListingParams } from "@/app/action/getListings";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import DiscoverClient from "@/app/components/pages/DiscoverClient";

interface DiscoverPageProps {
  searchParams: Promise<IListingParams & { page?: number; limit?: number }>;
}

const DiscoverPage = async (props: DiscoverPageProps) => {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page || 1);
  const limit = Number(searchParams.limit || 18);
  const search = searchParams.search || "";
  const sorted = searchParams.sorted || "recently";

  const { listings, totalCount } = await getListings({
    ...searchParams,
    page,
    limit,
    search,
    sorted,
  });

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
      <DiscoverClient
        listings={listings}
        currentUser={currentUser}
        currentPage={Number(page)}
        itemsPerPage={Number(limit)}
        totalCount={totalCount}
      />
    </ClientOnly>
  );
};

export default DiscoverPage;

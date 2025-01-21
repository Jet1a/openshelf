import getCurrentUser from "@/app/action/getCurrentUser";
import getReceipt from "@/app/action/getReceipt";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ReceiptClient from "@/app/components/pages/ReceiptClient";
import React from "react";

interface IParams {
  rentId?: string;
}

const ReceiptPage = async (props: { params: Promise<IParams> }) => {
  const params = await props.params;
  const rentals = await getReceipt(params);
  const currentUser = await getCurrentUser();

  if (!rentals) {
    return (
      <ClientOnly>
        <EmptyState
          title="No receipt for this rent"
          subtitle="Try again"
          showReset
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReceiptClient rentals={rentals} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ReceiptPage;

"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
}: EmptyStateProps) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-2">
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/discover")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;

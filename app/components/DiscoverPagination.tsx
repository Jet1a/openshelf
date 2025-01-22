import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPaginationRange } from "../action/getPaginationRange";

interface DiscoverPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const DiscoverPagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: DiscoverPaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginationRange = getPaginationRange(totalPages, currentPage);

  const handlePageChange = (
    e: React.MouseEvent,
    page: number | "previous" | "next"
  ) => {
    e.preventDefault();
    if (page === "previous" && currentPage > 1) {
      onPageChange(currentPage - 1);
    } else if (page === "next" && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    } else if (typeof page === "number") {
      onPageChange(page);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(e, "previous");
            }}
          />
        </PaginationItem>

        {paginationRange.map((item, index) => (
          <PaginationItem key={index}>
            {item === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                className={item === currentPage ? "bg-neutral-200" : ""}
                onClick={(e) => handlePageChange(e, item as number)}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(e, "next");
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default DiscoverPagination;

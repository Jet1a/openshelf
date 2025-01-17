"use client";
import { eachDayOfInterval } from "date-fns";
import { SafeListing, SafeRental, SafeUser } from "@/app/types";
import { useCallback, useMemo, useState } from "react";
import { genre } from "../Categories";
import Container from "../Container";
import BookHeader from "../book/BookHeader";
import BookInfo from "../book/BookInfo";
import useLoginModal from "@/app/hook/useLoginModal";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Range } from "react-date-range";
import BookRecommend from "../book/BookRecommend";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface BookClientProps {
  rentals?: SafeRental[];
  book: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  listings: SafeListing[];
}

const BookClient = ({
  rentals = [],
  book,
  currentUser,
  listings,
}: BookClientProps) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    rentals.forEach((rental) => {
      const range = eachDayOfInterval({
        start: new Date(rental.startDate),
        end: new Date(rental.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [rentals]);

  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateRental = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios
      .post("/api/rentals", {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        bookId: book?.id,
      })
      .then(() => {
        toast.success("Book Borrowed!");
        setDateRange(initialDateRange);
        router.push("/mybooks");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [book?.id, currentUser, dateRange, loginModal, router]);

  const category = useMemo(() => {
    return genre.find((item) => item.label === book.category);
  }, [book]);

  return (
    <Container>
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-row gap-6">
          <article className="flex pt-12 items-center lg:items-start justify-center mx-auto flex-wrap flex-col lg:flex-nowrap lg:flex-row gap-10">
            <BookHeader imageSrc={book.imageSrc} />
            <BookInfo
              book={book}
              onSubmit={onCreateRental}
              category={category?.label}
              onChangeDate={(value: Range) => setDateRange(value)}
              dateRange={dateRange}
              disabled={isLoading}
              disabledDates={disabledDates}
              id={book.id}
              currentUser={currentUser}
            />
          </article>
        </div>
      </main>
      <BookRecommend listings={listings} currentUser={currentUser} />
    </Container>
  );
};

export default BookClient;

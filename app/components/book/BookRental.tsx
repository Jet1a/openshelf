"use client";

import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../Button";

interface BookRentalProps {
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
}

const BookRental = ({
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}: BookRentalProps) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      <div className="flex flex-col items-center pb-0 p-4 flex-auto">
        <div className="text-xl font-semibold text-orange-400 border-b w-full text-center pb-3">
          Choose a date to rent your book.
        </div>
        <Calendar
          value={dateRange}
          disabledDates={disabledDates}
          onChangeDate={(value) => onChangeDate(value.selection)}
        />
      </div>
      <hr />
      <div className="p-4">
        <Button disable={disabled} label="Checked out!" onClick={onSubmit} />
      </div>
    </div>
  );
};

export default BookRental;

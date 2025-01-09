"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
  value: Range;
  onChangeDate: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

const Calendar = ({ value, onChangeDate, disabledDates }: CalendarProps) => {
  return (
    <DateRange
      rangeColors={["#FB9A4A"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChangeDate}
      showDateDisplay={false}
      direction="vertical"
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};

export default Calendar;

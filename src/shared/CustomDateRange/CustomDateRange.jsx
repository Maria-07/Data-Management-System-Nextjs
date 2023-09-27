import React from "react";
import { DateRangePicker, defaultStaticRanges } from "react-date-range";
import { motion } from "framer-motion";
// important
import {
  // addDays,
  // endOfDay,
  // startOfDay,
  // startOfMonth,
  // endOfMonth,
  // addMonths,
  // startOfWeek,
  // endOfWeek,
  // differenceInCalendarDays,
  addYears,
  endOfYear,
  isSameDay,
  startOfYear,
} from "date-fns";

// date range year

const CustomDateRange = ({ setRange, range, handleCancelDate, setOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="date-range rounded-lg"
    >
      <div>
        <DateRangePicker
          onChange={(item) => setRange([item.selection])}
          showSelectionPreview={true}
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          ranges={range}
          rangeColors={["#0AA7B8"]}
          months={2}
          direction="horizontal"
          className="border-2 border-gray-100 p-2 sm:p-0 bg-white"
          staticRanges={[
            ...defaultStaticRanges,
            {
              label: "Last Year",
              range: () => ({
                startDate: startOfYear(addYears(new Date(), -1)),
                endDate: endOfYear(addYears(new Date(), -1)),
              }),
              isSelected(range) {
                const definedRange = this.range();
                return (
                  isSameDay(range.startDate, definedRange.startDate) &&
                  isSameDay(range.endDate, definedRange.endDate)
                );
              },
            },
            {
              label: "This Year",
              range: () => ({
                startDate: startOfYear(new Date()),
                endDate: endOfYear(new Date()),
              }),
              isSelected(range) {
                const definedRange = this.range();
                return (
                  isSameDay(range.startDate, definedRange.startDate) &&
                  isSameDay(range.endDate, definedRange.endDate)
                );
              },
            },
          ]}
        />
      </div>
      <div className="text-right w-full bg-[#26818F]  rounded-b-md range-date-ok py-2 pr-1 shadow-xl">
        <button
          className="px-4 m-1 py-1 text-white border border-white rounded hover:border-red-700 hover:bg-red-700"
          type="submit"
          onClick={handleCancelDate}
        >
          Cancel
        </button>
        <button
          className="px-4 m-1 py-1 text-secondary border border-white bg-white rounded"
          type="submit"
          onClick={() => setOpen(false)}
        >
          Save
        </button>
      </div>
    </motion.div>
  );
};

export default CustomDateRange;

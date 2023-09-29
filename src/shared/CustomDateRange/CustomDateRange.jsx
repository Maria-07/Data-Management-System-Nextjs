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
          rangeColors={["#4F709C"]}
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
      <div className="w-full bg-secondary py-2 flex items-end justify-end rounded-b-md shadow-xl">
        <div className="mr-3">
          <button
            className="dcm-close-button mr-2"
            type="submit"
            onClick={handleCancelDate}
          >
            Cancel
          </button>
          <button
            className="dtm-button"
            type="submit"
            onClick={() => setOpen(false)}
          >
            Save
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomDateRange;

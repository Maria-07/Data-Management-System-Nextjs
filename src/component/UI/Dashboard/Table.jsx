import Link from "next/link";
import React from "react";

const Table = ({ tasks }) => {
  const { count, report, link } = tasks;

  return (
    <tr>
      <td className="border text-xs font-normal text-secondary py-1 px-2">
        <Link href={link}>{report}</Link>
      </td>
      <td className="border text-xs py-1 px-2 text-center text-secondary">
        <div>{count}</div>
      </td>
    </tr>
  );
};

export default Table;

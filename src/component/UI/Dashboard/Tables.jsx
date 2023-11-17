import React, { useEffect } from "react";
import Table from "./Table";

const Tables = ({ tableType, tableName }) => {
  // console.log(tableType);
  return (
    <div>
      <table className="shadow-lg w-full  bg-white">
        <h1 className="thead py-1 mb-0 bg-gradient-to-b from-teal-400 to-blue-900 text-white">
          {tableName}
        </h1>
        <div className="td">
          <tr>
            <th className="bg-gray-200 border thd text-xs py-1 px-2 text-center w-[30rem] ">
              Report
            </th>
            <th className="bg-gray-200 border  text-xs py-1 px-2 text-center w-[15rem]">
              Count
            </th>
          </tr>
          {tableType.map((tasks, i) => (
            <Table key={i} tasks={tasks}></Table>
          ))}
        </div>
      </table>
    </div>
  );
};

export default Tables;

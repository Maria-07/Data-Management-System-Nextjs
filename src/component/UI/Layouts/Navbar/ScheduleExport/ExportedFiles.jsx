import React from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";

const ExportedFiles = () => {
  return (
    <div>
      <div>
        <div className="flex gap-4 px-3 py-1">
          <div>
            <h1 className=" text-3xl font-bold text-secondary">
              <AiOutlineCloudDownload />
            </h1>
          </div>
          <div className="text-xs text-wite pt-1">
            <h1 className="font-semibold mb-1">837-11660888499.txt</h1>
            <h1 className=" text-xs font-light text-[#3fc553]">CSV file</h1>
            <small className="block text-xs font-thin text-gray-600">
              5 day left
            </small>
            <button
              type="button"
              className="inline-block px-2 bg-secondary text-white font-normal text-[9px] leading-tight py-[1px] rounded-md shadow-md  hover:shadow-lg  mt-2"
            >
              Ready To Download
            </button>
          </div>
        </div>
        <hr className=" w-11/12 mx-auto mt-2" />
      </div>
    </div>
  );
};

export default ExportedFiles;

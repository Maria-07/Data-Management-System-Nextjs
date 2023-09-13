import { BiEditAlt } from "react-icons/bi";
import LibrarySidebar from "../UI/Layouts/Library/LibrarySidebar";
import { Select } from "antd";
import { useState } from "react";

const LibraryLayout = ({ children }) => {
  const items = ["lion", "elephant", "tiger", "giraffe", "zebra"];
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState("");
  const onChange = (value) => {
    console.log(`selected ${value}`);
    setValue(value);
  };
  return (
    <div>
      <div className=" flex items-center justify-between flex-wrap">
        <div>
          {!isEdit ? (
            <div className="flex items-center gap-3 text-[20px]">
              Behavior Reduction{" "}
              <BiEditAlt
                onClick={() => setIsEdit(!isEdit)}
                className="text-gray-400"
              />
            </div>
          ) : (
            <>
              <div className="flex">
                <input
                  placeholder="Rename Program Name"
                  type="text"
                  className="input-border w-[150%]"
                />
                <button
                  onClick={() => setIsEdit(!isEdit)}
                  className="text-sm ml-[-10px] bg-white font-semibold text-primary hover:bg-sky-50 transition-all px-2 py-1 border border-primary rounded-r-md"
                >
                  done
                </button>
              </div>
            </>
          )}
        </div>
        <Select
          // style={{
          //   width: "10%",
          // }}
          className="min-w-[250px]"
          size="medium"
          bordered={true}
          onChange={onChange}
          options={items.map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </div>
      <hr className="mt-5" />
      <div className="flex">
        <LibrarySidebar></LibrarySidebar>
        <div className="bg-gray-50 w-full min-h-[80vh]">{children}</div>
      </div>
    </div>
  );
};

export default LibraryLayout;

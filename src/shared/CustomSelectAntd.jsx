import { Button, Divider, Input, Select, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";

const CustomSelectAntd = ({ item, setOption, sName }) => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const [addShow, setAddShow] = useState(false);

  useEffect(() => {
    const uniqueArray = [...new Set(item)];
    if (uniqueArray) {
      const sortedArray = uniqueArray.sort();
      setItems(sortedArray);
    }
  }, [item]);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = () => {
    if (name.trim() !== "") {
      // Add the new option to the beginning of the options list
      setItems([name, ...items]);
      setOption([name, ...items]); // Notify the parent component with the new option list
      setName("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
    setAddShow(false);
  };

  const onSearch = (value) => {
    setOption(value);
  };

  const onChange = (value) => {
    setOption(value);
  };

  return (
    <div>
      <Select
        showSearch
        style={{
          width: "100%",
        }}
        onChange={onChange}
        // onSearch={onSearch}
        onInputKeyDown={(e) => {
          if (e.key === "Enter") {
            addItem();
          }
        }}
        defaultActiveFirstOption={false}
        filterOption={true}
        notFoundContent={null}
        dropdownRender={(menu) => (
          <>
            {menu}
            <div className="flex items-center gap-2 px-2 py-2 mt-2 border-t-[1px]">
              {!addShow && (
                <div className="]">
                  <button
                    onClick={() => setAddShow(!addShow)}
                    className="dtm-button flex items-center gap-1 uppercase"
                  >
                    <BiPlus className="text-xl" /> ADD {sName}
                  </button>
                </div>
              )}
              {addShow && (
                <div className="flex items-center gap-2 ">
                  {" "}
                  <div className="w-[500px]">
                    <Input
                      placeholder="Please enter New Option"
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                      onPressEnter={addItem}
                    />
                  </div>
                  <div className="">
                    <button
                      onClick={addItem}
                      className="dtm-button flex items-center gap-1 "
                    >
                      <BiPlus className="text-xl" /> SAVE
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* <Divider
              style={{
                margin: "1px 0",
              }}
            /> */}
          </>
        )}
        options={items.map((item) => ({
          label: item,
          value: item,
        }))}
      />
    </div>
  );
};

export default CustomSelectAntd;

import { Button, Divider, Input, Select, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { BiPlus } from "react-icons/bi";

const CustomSelectAntd = ({ item, setOption }) => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const inputRef = useRef(null);

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
            <div className="flex items-center gap-2 px-2 py-2 mb-2 shadow-md">
              <div className="w-[100%]">
                <Input
                  placeholder="Please enter New Treatment"
                  ref={inputRef}
                  value={name}
                  onChange={onNameChange}
                  onPressEnter={addItem}
                />
              </div>
              <div className="w-[100%]">
                <button
                  onClick={addItem}
                  className="dtm-button flex items-center gap-1 "
                >
                  <BiPlus className="text-xl" /> ADD TREATMENT
                </button>
              </div>
            </div>
            {/* <Divider
              style={{
                margin: "1px 0",
              }}
            /> */}
            {menu}
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

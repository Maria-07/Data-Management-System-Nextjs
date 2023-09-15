import { Select } from "antd";
import { useState } from "react";

const CustomSelectTagAntd = () => {
  const [value, setValue] = useState([]); // For selected values
  const [inputValue, setInputValue] = useState(""); // For the input value

  //   console.log("value", value);
  //   console.log("inputValue", inputValue);

  const options = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const handleChange = (selectedValues) => {
    // Handle selected values
    setValue(selectedValues);
  };

  const handleInputChange = (input) => {
    // Handle the input value
    setInputValue(input);
  };

  const handleInputConfirm = () => {
    if (inputValue && !value.includes(inputValue)) {
      setValue([...value, inputValue]);
    }
    setInputValue(""); // Clear the input after adding
  };

  return (
    <Select
      mode="tags"
      style={{
        width: "100%",
      }}
      value={value}
      onChange={handleChange}
      onInputKeyDown={(e) => {
        if (e.key === "Enter") {
          handleInputConfirm();
        }
      }}
      options={options}
      placeholder="Select tags or add your own"
      onInput={handleInputChange}
      onBlur={handleInputConfirm}
      autoFocus
    />
  );
};

export default CustomSelectTagAntd;

import { Checkbox, Col, Collapse, Row } from "antd";
import React, { useState } from "react";
import { BiSortAZ, BiSortZA } from "react-icons/bi";

const { Panel } = Collapse;

const ClientOrganization = ({ handleClose }) => {
  const [items, setItems] = useState([
    {
      id: 1,
      target_title: "Signature Behavioral Health",
      clients: [
        { name: "John Doe", status: false },
        { name: "Alice Johnson", status: false },
        { name: "Bob Smith", status: false },
        { name: "Emily Davis", status: false },
        { name: "Michael Wilson", status: false },
        { name: "Olivia Brown", status: false },
        { name: "Sophia Lee", status: true },
        { name: "William Anderson", status: false },
        { name: "Emma Martinez", status: true },
        { name: "James Taylor", status: false },
      ],
      author: "kristina",
      type: "folder",
    },
    {
      id: 2,
      target_title: "Unassigned",
      clients: [
        { name: "John Doe", status: true },
        { name: "Alice Johnson", status: false },
        { name: "Bob Smith", status: true },
        { name: "Emily Davis", status: false },
        { name: "Michael Wilson", status: true },
        { name: "Olivia Brown", status: false },
        { name: "Sophia Lee", status: true },
        { name: "William Anderson", status: false },
        { name: "Emma Martinez", status: true },
        { name: "James Taylor", status: false },
      ],
      author: "kristina",
      type: "folder",
    },
  ]);

  //! items sort system
  const [sortOrder, setSortOrder] = useState(""); // 'asc' for ascending, 'desc' for descending

  // Function to sort the items array
  const sortItems = () => {
    const sortedItems = [...items];
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    if (sortOrder === "asc") {
      sortedItems.sort((a, b) => a.target_title.localeCompare(b.target_title));
    } else {
      sortedItems.sort((a, b) => b.target_title.localeCompare(a.target_title));
    }
    setItems(sortedItems);
  };

  //! item
  const onChange = (checkedValues) => {
    // console.log("checked = ", checkedValues);
  };

  return (
    <div className="">
      <form>
        <div>
          <div className=" bg-primary text-white  rounded-t-lg">
            <button
              type="button"
              onClick={sortItems}
              className=" px-5 flex items-center gap-2 width-[100%] py-1 text-[16px] font-semibold"
            >
              Business Unit
              <div className="">
                {sortOrder === "desc" ? (
                  <BiSortAZ className="text-lg" />
                ) : (
                  <BiSortZA className="text-lg" />
                )}
              </div>
            </button>
          </div>
          <div className="border-x-[1px] border-b-[1px] bg-gray-50">
            <div>
              {items.map((item, i) => (
                <div key={i}>
                  {" "}
                  <div className="w-full my-auto border-t-[1px]">
                    <Collapse ghost accordion>
                      <Panel
                        header={
                          <div>
                            <div className="flex items-center justify-between">
                              <div className="text-base">
                                {item.target_title}
                              </div>
                            </div>
                          </div>
                        }
                        key={item.id}
                      >
                        <div className="bg-white border-[1px] mx-[-17px] px-10">
                          <Checkbox.Group
                            style={{
                              width: "100%",
                            }}
                            className="py-2"
                            defaultValue={item.clients
                              .filter((client) => client.status)
                              .map((client) => client.name)}
                            onChange={onChange}
                          >
                            {item?.clients?.map((c, i) => (
                              <div key={i}>
                                <div className="">
                                  <Checkbox
                                    className="text-base my-1"
                                    value={c.name}
                                  >
                                    {c.name}
                                  </Checkbox>
                                  <br />
                                </div>
                              </div>
                            ))}
                          </Checkbox.Group>
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-gray-200 pt-[1px] mt-3"></div>
        <div className="flex gap-3 items-end justify-end mb-2 mt-4">
          <button type="submit" className="dcm-modal-submit-button">
            Ok
          </button>
          <button onClick={handleClose} className="dcm-modal-close-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientOrganization;

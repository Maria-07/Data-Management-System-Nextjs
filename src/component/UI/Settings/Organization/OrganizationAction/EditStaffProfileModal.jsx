import { Modal, Table } from "antd";
import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const EditStaffProfileModal = ({ handleClose, clicked }) => {
  //! Table data ----------------------------------------------------------
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  //! Optimized function to get dynamic filter value-text
  const generateFilterValues = (data, columnKey) => {
    const uniqueValues = [...new Set(data?.map((d) => d[columnKey]))];
    return uniqueValues.map((value) => ({ text: value, value }));
  };

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  //get rows to be deleted
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRows);
    },
    getCheckboxProps: (record) => {
      //console.log("record", record);
      if (record?.type == "folder") {
        const rowIndex = 1;
        return {
          disabled: rowIndex === 1,
        };
      }
    },
  };

  const items = [
    {
      id: 1,
      name: "Emily Wilson",
      email: "emily.wilson@example.com",
      Ic_status: "Connected",
      role: "Parent",
    },
    {
      id: 2,
      name: "Daniel Anderson",
      email: "daniel.anderson@example.com",
      Ic_status: "Disconnected",
      role: "manager",
    },
    {
      id: 3,
      name: "Olivia Lee",
      email: "olivia.lee@example.com",
      Ic_status: "Connected",
      role: "Behavior Technician",
    },
    {
      id: 4,
      name: "William Smith",
      email: "william.smith@example.com",
      Ic_status: "Disconnected",
      role: "Behavior Analyst",
    },
    {
      id: 5,
      name: "Sophia Johnson",
      email: "sophia.johnson@example.com",
      Ic_status: "Connected",
      role: "Supervisor",
    },
    {
      id: 6,
      name: "Michael Davis",
      email: "michael.davis@example.com",
      Ic_status: "Connected",
      role: "Parent",
    },
    {
      id: 7,
      name: "Emma Brown",
      email: "emma.brown@example.com",
      Ic_status: "Disconnected",
      role: "manager",
    },
    {
      id: 8,
      name: "James Garcia",
      email: "james.garcia@example.com",
      Ic_status: "Connected",
      role: "Behavior Technician",
    },
    {
      id: 9,
      name: "Ava Martinez",
      email: "ava.martinez@example.com",
      Ic_status: "Disconnected",
      role: "Behavior Analyst",
    },
    {
      id: 10,
      name: "Benjamin Adams",
      email: "benjamin.adams@example.com",
      Ic_status: "Connected",
      role: "Supervisor",
    },
    {
      id: 11,
      name: "Chloe Hall",
      email: "chloe.hall@example.com",
      Ic_status: "Connected",
      role: "Parent",
    },
    {
      id: 12,
      name: "Liam White",
      email: "liam.white@example.com",
      Ic_status: "Disconnected",
      role: "manager",
    },
    {
      id: 13,
      name: "Mia Scott",
      email: "mia.scott@example.com",
      Ic_status: "Connected",
      role: "Behavior Technician",
    },
    {
      id: 14,
      name: "Ethan Clark",
      email: "ethan.clark@example.com",
      Ic_status: "Disconnected",
      role: "Behavior Analyst",
    },
    {
      id: 15,
      name: "Isabella Lewis",
      email: "isabella.lewis@example.com",
      Ic_status: "Connected",
      role: "Supervisor",
    },
    {
      id: 16,
      name: "Aiden Turner",
      email: "aiden.turner@example.com",
      Ic_status: "Connected",
      role: "Parent",
    },
    {
      id: 17,
      name: "Charlotte Hall",
      email: "charlotte.hall@example.com",
      Ic_status: "Disconnected",
      role: "manager",
    },
    {
      id: 18,
      name: "Mason Green",
      email: "mason.green@example.com",
      Ic_status: "Connected",
      role: "Behavior Technician",
    },
    {
      id: 19,
      name: "Harper Martinez",
      email: "harper.martinez@example.com",
      Ic_status: "Disconnected",
      role: "Behavior Analyst",
    },
    {
      id: 20,
      name: "Elijah Adams",
      email: "elijah.adams@example.com",
      Ic_status: "Connected",
      role: "Supervisor",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 130,
      filters: generateFilterValues(items, "name"),
      filterSearch: true,
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      //   sorter is for sorting asc or dsc purpose
      sorter: (a, b) => {
        return a.name > b.name ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      render: (_, { name }) => {
        return (
          <div>
            <button className="text-secondary font-medium">{name}</button>
          </div>
        );
      },
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
      filters: generateFilterValues(items, "email"),
      filterSearch: true,
      //render contains what we want to reflect as our data
      render: (_, { email }) => {
        return (
          <div>
            <h1>{email ? email : <h1 className="text-red-600">No Data</h1>}</h1>
          </div>
        );
      },
      filteredValue: filteredInfo.email || null,
      onFilter: (value, record) => {
        if (record?.email !== null) {
          return record.email.includes(value);
        }
      },
      sorter: (a, b) => {
        return a.email > b.email ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "TherapyPMS Id",
      dataIndex: "role",
      key: "role",
      width: 130,
      filters: generateFilterValues(items, "role"),
      filterSearch: true,
      filteredValue: filteredInfo.role || null,
      onFilter: (value, record) => record.role.includes(value),
      //   sorter is for sorting asc or dsc purpose
      sorter: (a, b) => {
        return a.role > b.role ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "role" ? sortedInfo.order : null,
      render: (_, { role }) => {
        return (
          <div>
            <h1 className="text-center">3165</h1>
          </div>
        );
      },
      ellipsis: true,
    },
  ];

  console.log(filteredInfo);
  return (
    <div>
      <Modal
        open={clicked}
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={800}
        closable={false}
        className="box"
      >
        <div className="">
          <div className="flex items-center justify-between">
            <h1 className="text-xl text-primary font-semibold tracking-tight">
              Link to TherapyPMS
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <form>
            <div className="my-5 overflow-scroll">
              <Table
                pagination={false}
                rowKey={(record) => record.id}
                size="small"
                bordered
                className="table-striped-rows text-xs font-normal"
                columns={columns}
                dataSource={items}
                rowSelection={{
                  ...rowSelection,
                }}
                scroll={{
                  y: 650,
                }}
                onChange={handleChange}
              />
            </div>
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
      </Modal>
    </div>
  );
};

export default EditStaffProfileModal;

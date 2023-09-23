import { Table } from "antd";
import { useState } from "react";
import OrganizationAction from "../OrganizationAction/OrganizationAction";

const Manager = () => {
  const items = [
    {
      patient_name: "Emily Wilson",
      email: "emily.wilson@example.com",
      Ic_status: "Connected",
      role: "manager",
    },
    {
      patient_name: "Daniel Anderson",
      email: "daniel.anderson@example.com",
      Ic_status: "Disconnected",
      role: "manager",
    },
    {
      patient_name: "Olivia Lee",
      email: "olivia.lee@example.com",
      Ic_status: "Connected",
      role: "Behavior Technician",
    },
    {
      patient_name: "William Smith",
      email: "william.smith@example.com",
      Ic_status: "Disconnected",
      role: "Behavior Analyst",
    },
    {
      patient_name: "Sophia Johnson",
      email: "sophia.johnson@example.com",
      Ic_status: "Connected",
      role: "Supervisor",
    },
    {
      patient_name: "Michael Davis",
      email: "michael.davis@example.com",
      Ic_status: "Connected",
      role: "Parent",
    },
    {
      patient_name: "Emma Brown",
      email: "emma.brown@example.com",
      Ic_status: "Disconnected",
      role: "manager",
    },
    {
      patient_name: "James Garcia",
      email: "james.garcia@example.com",
      Ic_status: "Connected",
      role: "Behavior Technician",
    },
    {
      patient_name: "Ava Martinez",
      email: "ava.martinez@example.com",
      Ic_status: "Disconnected",
      role: "Behavior Analyst",
    },
    {
      patient_name: "Benjamin Adams",
      email: "benjamin.adams@example.com",
      Ic_status: "Connected",
      role: "Supervisor",
    },
    {
      patient_name: "Chloe Hall",
      email: "chloe.hall@example.com",
      Ic_status: "Connected",
      role: "Parent",
    },
    {
      patient_name: "Liam White",
      email: "liam.white@example.com",
      Ic_status: "Disconnected",
      role: "manager",
    },
    {
      patient_name: "Mia Scott",
      email: "mia.scott@example.com",
      Ic_status: "Connected",
      role: "Behavior Technician",
    },
    {
      patient_name: "Ethan Clark",
      email: "ethan.clark@example.com",
      Ic_status: "Disconnected",
      role: "Behavior Analyst",
    },
    {
      patient_name: "Isabella Lewis",
      email: "isabella.lewis@example.com",
      Ic_status: "Connected",
      role: "Supervisor",
    },
    {
      patient_name: "Aiden Turner",
      email: "aiden.turner@example.com",
      Ic_status: "Connected",
      role: "Parent",
    },
    {
      patient_name: "Charlotte Hall",
      email: "charlotte.hall@example.com",
      Ic_status: "Disconnected",
      role: "manager",
    },
    {
      patient_name: "Mason Green",
      email: "mason.green@example.com",
      Ic_status: "Connected",
      role: "Behavior Technician",
    },
    {
      patient_name: "Harper Martinez",
      email: "harper.martinez@example.com",
      Ic_status: "Disconnected",
      role: "Behavior Analyst",
    },
    {
      patient_name: "Elijah Adams",
      email: "elijah.adams@example.com",
      Ic_status: "Connected",
      role: "Supervisor",
    },
  ];
  //! Optimized function to get dynamic filter value-text
  const generateFilterValues = (data, columnKey) => {
    const uniqueValues = [...new Set(data?.map((d) => d[columnKey]))];
    return uniqueValues.map((value) => ({ text: value, value }));
  };

  //! table info start
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "Manager",
      dataIndex: "patient_name",
      key: "patient_name",
      width: 150,
      filters: generateFilterValues(items, "patient_name"),
      filterSearch: true, //Filtering value search(Antd new Feature)
      filteredValue: filteredInfo.patient_name || null,
      onFilter: (value, record) => record.patient_name.includes(value),
      sorter: (a, b) => {
        return a.patient_name > b.patient_name ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "patient_name" ? sortedInfo.order : null,

      // render contains what we want to reflect as our data
      // patient_name, id, key=>each row data(object) property value can be accessed.
      render: (_, { patient_name, id, key }) => {
        //console.log("tags : ", patient_name, id, key);
        return (
          <div className="">
            <button className="text-secondary font-medium">
              {patient_name}
            </button>
          </div>
        );
      },
      // ellipsis: true,
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
      title: "Integration connected",
      dataIndex: "Ic_status",
      key: "Ic_status",
      width: 100,
      filters: generateFilterValues(items, "Ic_status"),
      filterSearch: true,
      //render contains what we want to reflect as our data
      render: (_, { Ic_status }) => {
        return (
          <div>
            <div className="flex justify-center items-center">
              {Ic_status === "Connected" ? (
                <button className="bg-secondary text-white px-2 rounded-md text-xs pb-[4px] pt-[2px]">
                  {Ic_status}
                </button>
              ) : (
                <h1 className="text-red-600"></h1>
              )}
            </div>
          </div>
        );
      },
      filteredValue: filteredInfo.Ic_status || null,
      onFilter: (value, record) => {
        if (record?.Ic_status !== null) {
          return record.Ic_status.includes(value);
        }
      },
      //   sorter is for sorting asc or dsc purpose
      sorter: (a, b) => {
        return a.Ic_status > b.Ic_status ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "Ic_status" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "Action",
      key: "is_active_client",
      dataIndex: "is_active_client",
      width: 100,
      render: (_, record) => {
        //console.log("Status : ", Status);
        return (
          <div className="flex justify-center">
            <OrganizationAction record={record}></OrganizationAction>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      {" "}
      <div className=" overflow-scroll">
        {" "}
        <Table
          bordered
          rowKey="id" //warning issue solve ar jnno unique id rowKey hisabey use hobey
          pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
          size="small"
          className="table-striped-rows text-xs font-normal"
          columns={columns}
          dataSource={items} //Which data chunk you want to show in table
          // For fixed header table at top
          // scroll={{
          //   y: 750,
          // }}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Manager;

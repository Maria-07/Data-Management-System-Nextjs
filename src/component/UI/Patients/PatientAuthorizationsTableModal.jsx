import React, { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Table } from "antd";
// import Loading from "../../../../Loading/Loading";
//Ant Design modal used here[to solve table data filtering issue]
import { Modal } from "antd";
import Link from "next/link";
// import { useGetPatientAuthorizationQuery } from "../../../../features/Patient_redux/authorization/authorizationApi";
// import useToken from "../../../../CustomHooks/useToken";

const PatientAuthorizationsTableModal = ({ modalOpen, setModalOpen }) => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const data = [
    {
      key: "1",
      client_full_name: "John Doe",
      phone_number: "123-456-7890",
      client_dob: "1990-01-15",
      client_gender: "Male",
      location: "New York",
      insurance: "6780496111",
      id: "1",
      is_active_client: true,
    },
    {
      key: "2",
      client_full_name: "Alice Johnson",
      phone_number: "987-654-3210",
      client_dob: "1985-07-25",
      client_gender: "Female",
      location: "Los Angeles",
      insurance: "1261739329",
      id: "2",
      is_active_client: false,
    },
    {
      key: "3",
      client_full_name: "Bob Smith",
      phone_number: "555-123-4567",
      client_dob: "1978-12-03",
      client_gender: "Male",
      location: "Chicago",
      insurance: "5614267557",
      id: "3",
      is_active_client: true,
    },
    // Add more data entries as needed
  ];

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 120,
      filters: [
        {
          text: "Realcube",
          value: "Realcube",
        },
        {
          text: "Mycat",
          value: "Mycat",
        },
        {
          text: "Donovan",
          value: "Donovan",
        },
        {
          text: "Burke Beard",
          value: "Burke Beard",
        },
        {
          text: "Hector Moses",
          value: "Hector Moses",
        },
      ],
      filteredValue: filteredInfo.description || null,
      onFilter: (value, record) => record.description.includes(value),
      sorter: (a, b) => {
        return a.description > b.description ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "description" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Onset Date",
      dataIndex: "onset_date",
      key: "onset_date",
      width: 100,
      filters: [
        {
          text: `Amet`,
          value: "Amet",
        },
        {
          text: "Malesuada",
          value: "Malesuada",
        },
      ],
      filteredValue: filteredInfo.onset_date || null,
      onFilter: (value, record) => record.onset_date.includes(value),
      //   sorter is for sorting asc or dsc purstatuse
      sorter: (a, b) => {
        return a.onset_date > b.onset_date ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "onset_date" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      width: 100,
      filters: [
        {
          text: `Amet`,
          value: "Amet",
        },
        {
          text: "Malesuada",
          value: "Malesuada",
        },
      ],
      filteredValue: filteredInfo.end_date || null,
      onFilter: (value, record) => record.end_date.includes(value),
      //   sorter is for sorting asc or dsc purstatuse
      sorter: (a, b) => {
        return a.end_date > b.end_date ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "end_date" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Insurance",
      dataIndex: "insurance",
      key: "insurance",
      width: 150,
      filters: [
        {
          text: `Amet`,
          value: "Amet",
        },
        {
          text: "Malesuada",
          value: "Malesuada",
        },
      ],
      render: (_, { authorization_name }) => {
        if (authorization_name) {
          return <h1>{authorization_name.split(" ")[0]}</h1>;
        }
      },
      filteredValue: filteredInfo.insurance || null,
      onFilter: (value, record) => record.insurance.includes(value),
      //   sorter is for sorting asc or dsc purstatuse
      sorter: (a, b) => {
        return a.insurance > b.insurance ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "insurance" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Ins. ID",
      dataIndex: "uci_id",
      key: "uci_id",
      width: 150,
      filters: [
        {
          text: `Amet`,
          value: "Amet",
        },
        {
          text: "Malesuada",
          value: "Malesuada",
        },
      ],
      filteredValue: filteredInfo.uci_id || null,
      onFilter: (value, record) => record.uci_id.includes(value),
      //   sorter is for sorting asc or dsc purstatuse
      sorter: (a, b) => {
        return a.uci_id > b.uci_id ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "uci_id" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Auth No.",
      dataIndex: "authorization_number",
      key: "authorization_number",
      width: 150,
      filters: [
        {
          text: `Amet`,
          value: "Amet",
        },
        {
          text: "Malesuada",
          value: "Malesuada",
        },
      ],
      filteredValue: filteredInfo.authorization_number || null,
      onFilter: (value, record) => record.authorization_number.includes(value),
      //   sorter is for sorting asc or dsc purstatuse
      sorter: (a, b) => {
        return a.authorization_number > b.authorization_number ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "authorization_number"
          ? sortedInfo.order
          : null,
      ellipsis: true,
    },
  ];

  return (
    <div>
      <Modal
        width={1200}
        open={modalOpen}
        centered
        footer={false}
        closable={false}
        bodyStyle={{ padding: "0" }}
        className="box rounded-lg"
      >
        <div className="px-5 py-2">
          <div className="flex items-center justify-between">
            <h1 className="text-lg text-left text-orange-400 ">
              All Authorizations
            </h1>
            <IoCloseCircleOutline
              onClick={() => setModalOpen(false)}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          {loading ? (
            // <Loading></Loading>
            <>Loading</>
          ) : (
            <div className=" overflow-scroll">
              <Table
                sortDirections={["ascend", "descend"]}
                pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
                size="small"
                className=" text-xs font-normal mt-5"
                columns={columns}
                bordered
                rowKey={(record) => record.id} //record is kind of whole one data object and here we are
                dataSource={data}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <div className=" flex items-end justify-end mt-2">
            {/* <Link to={`/admin/patient/patient-authorization/${patient_id}`}>
              <button className=" pms-button mr-2" type="submit">
                Add New Auth
              </button>
            </Link> */}

            <button
              className="pms-close-button"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PatientAuthorizationsTableModal;

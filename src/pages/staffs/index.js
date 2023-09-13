/* eslint-disable react-hooks/rules-of-hooks */
import RootLayout from "@/component/Layouts/RootLayout";
import StuffStatusAction from "@/component/UI/Staff/StuffStatusAction";
import { Table } from "antd";
import Link from "next/link";
import { useState } from "react";

const staffPage = () => {
  const staffTableData = [
    {
      key: "1",
      full_name: "Jamey",
      credential_type: "Type A",
      office_phone: "123-456-7890",
      office_email: "jamey@example.com",
      language: "Hindi",
      id: "1",
      Status: "Scheduled",
      is_active: true,
    },
    {
      key: "2",
      full_name: "Minnie",
      credential_type: "Type B",
      office_phone: "987-654-3210",
      office_email: "minnie@example.com",
      language: "French",
      id: "2",
      Status: "Scheduled",
      is_active: false,
    },
    {
      key: "3",
      full_name: "Donald",
      credential_type: "Type C",
      office_phone: "555-123-4567",
      office_email: "donald@example.com",
      language: "English",
      id: "3",
      Status: "Scheduled",
      is_active: true,
    },
    {
      key: "4",
      full_name: "Burke Beard",
      credential_type: "Type A",
      office_phone: "333-222-1111",
      office_email: "burke@example.com",
      language: "Hindi",
      id: "4",
      Status: "Scheduled",
      is_active: true,
    },
    {
      key: "5",
      full_name: "Hector Moses",
      credential_type: "Type B",
      office_phone: "777-888-9999",
      office_email: "hector@example.com",
      language: "French",
      id: "5",
      Status: "Scheduled",
      is_active: false,
    },
    {
      key: "6",
      full_name: "Alice",
      credential_type: "Type A",
      office_phone: "555-555-5555",
      office_email: "alice@example.com",
      language: "English",
      id: "6",
      Status: "Scheduled",
      is_active: true,
    },
    {
      key: "7",
      full_name: "Bob",
      credential_type: "Type C",
      office_phone: "444-333-2222",
      office_email: "bob@example.com",
      language: "French",
      id: "7",
      Status: "Scheduled",
      is_active: false,
    },
    {
      key: "8",
      full_name: "Eva",
      credential_type: "Type A",
      office_phone: "222-111-3333",
      office_email: "eva@example.com",
      language: "Hindi",
      id: "8",
      Status: "Scheduled",
      is_active: true,
    },
    {
      key: "9",
      full_name: "Grace",
      credential_type: "Type B",
      office_phone: "888-777-6666",
      office_email: "grace@example.com",
      language: "English",
      id: "9",
      Status: "Scheduled",
      is_active: true,
    },
    {
      key: "10",
      full_name: "Hank",
      credential_type: "Type C",
      office_phone: "666-444-9999",
      office_email: "hank@example.com",
      language: "French",
      id: "10",
      Status: "Scheduled",
      is_active: false,
    },
    {
      key: "11",
      full_name: "Ivy",
      credential_type: "Type A",
      office_phone: "111-222-3333",
      office_email: "ivy@example.com",
      language: "Hindi",
      id: "11",
      Status: "Scheduled",
      is_active: true,
    },
    {
      key: "12",
      full_name: "Jack",
      credential_type: "Type B",
      office_phone: "222-333-4444",
      office_email: "jack@example.com",
      language: "English",
      id: "12",
      Status: "Scheduled",
      is_active: true,
    },
    {
      key: "13",
      full_name: "Karen",
      credential_type: "Type C",
      office_phone: "333-444-5555",
      office_email: "karen@example.com",
      language: "French",
      id: "13",
      Status: "Scheduled",
      is_active: false,
    },
    {
      key: "14",
      full_name: "Leo",
      credential_type: "Type A",
      office_phone: "444-555-6666",
      office_email: "leo@example.com",
      language: "Hindi",
      id: "14",
      Status: "Scheduled",
      is_active: true,
    },
    {
      key: "15",
      full_name: "Mia",
      credential_type: "Type B",
      office_phone: "555-666-7777",
      office_email: "mia@example.com",
      language: "English",
      id: "15",
      Status: "Scheduled",
      is_active: true,
    },
    {
      key: "16",
      full_name: "Nash",
      credential_type: "Type C",
      office_phone: "666-777-8888",
      office_email: "nash@example.com",
      language: "French",
      id: "16",
      Status: "Scheduled",
      is_active: false,
    },
    {
      key: "17",
      full_name: "Olivia",
      credential_type: "Type A",
      office_phone: "777-888-9999",
      office_email: "olivia@example.com",
      language: "Hindi",
      id: "17",
      Status: "Scheduled",
      is_active: true,
    },
    {
      key: "18",
      full_name: "Paul",
      credential_type: "Type B",
      office_phone: "888-999-0000",
      office_email: "paul@example.com",
      language: "French",
      id: "18",
      Status: "Scheduled",
      is_active: false,
    },
    {
      key: "19",
      full_name: "Quincy",
      credential_type: "Type C",
      office_phone: "555-444-3333",
      office_email: "quincy@example.com",
      language: "English",
      id: "19",
      Status: "Scheduled",
      is_active: true,
    },
    {
      key: "20",
      full_name: "Rachel",
      credential_type: "Type A",
      office_phone: "444-333-2222",
      office_email: "rachel@example.com",
      language: "French",
      id: "20",
      Status: "Scheduled",
      is_active: true,
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
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
      width: 150,
      render: (_, { full_name, id }) => {
        return (
          <Link
            href={`/admin/staff/staffs-biographic/${id}`}
            className="text-secondary"
          >
            {full_name}
          </Link>
        );
      },
      filters: generateFilterValues(staffTableData, "full_name"),
      filteredValue: filteredInfo.full_name || null,
      onFilter: (value, record) => record.full_name.includes(value),
      sorter: (a, b) => {
        return a.full_name > b.full_name ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "full_name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Credential Type",
      dataIndex: "credential_type",
      key: "credential_type",
      width: 150,
      filters: generateFilterValues(staffTableData, "credential_type"),
      filteredValue: filteredInfo.credential_type || null,
      onFilter: (value, record) => record.credential_type.includes(value),
      //   sorter is for sorting asc or dsc purpose
      sorter: (a, b) => {
        return a.credential_type > b.credential_type ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "credential_type" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Phone",
      dataIndex: "office_phone",
      key: "office_phone",
      width: 120,
      sorter: (a, b) => {
        return a.Phone > b.Phone ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "office_phone" ? sortedInfo.order : null,
      filters: generateFilterValues(staffTableData, "office_phone"),
      filteredValue: filteredInfo.office_phone || null,
      onFilter: (value, record) => record.office_phone.includes(value),
      // render contains what we want to reflect as our data
      render: (_, { office_phone }) => {
        return (
          <div>
            <h1>{office_phone ? office_phone : "No Data"}</h1>
          </div>
        );
      },
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "office_email",
      key: "office_email",
      width: 200,
      filters: generateFilterValues(staffTableData, "office_email"),
      filterSearch: true, //Filtering value search(Antd new Feature)
      filteredValue: filteredInfo.office_email || null,
      onFilter: (value, record) => record.office_email.includes(value),
      //   sorter is for sorting asc or dsc purpose
      sorter: (a, b) => {
        return a.office_email > b.office_email ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "office_email" ? sortedInfo.order : null,

      ellipsis: true,
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      width: 100,
      filters: generateFilterValues(staffTableData, "language"),
      filteredValue: filteredInfo.Language || null,
      onFilter: (value, record) => record.Language.includes(value),
      //   sorter is for sorting asc or dsc purpose
      sorter: (a, b) => {
        return a.language > b.language ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "language" ? sortedInfo.order : null,

      ellipsis: true,
    },
    {
      title: "Scheduled",
      dataIndex: "id",
      key: "id",
      width: 100,
      filters: generateFilterValues(staffTableData, "id"),
      filteredValue: filteredInfo.office_phone || null,
      onFilter: (value, record) => record.office_phone.includes(value),
      render: (_, { Status }) => {
        //console.log("Status : ", Status);
        return <div>{Status}</div>;
      },
      sorter: (a, b) => {
        return a.insurance > b.insurance ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "insurance" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Status",
      key: "is_active",
      dataIndex: "is_active",
      width: 120,
      render: (_, { is_active, id }) => {
        //console.log("Status : ", Status);
        return <StuffStatusAction status={is_active}></StuffStatusAction>;
      },
    },
  ];

  return (
    <div>
      <h1 className="text-lg text-orange-500 text-left font-semibold mb-5">
        Staffs
      </h1>
      <div className=" overflow-scroll">
        <Table
          rowKey={(record) => record.id}
          pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
          size="small"
          className="table-striped-rows text-xs font-normal"
          columns={columns}
          dataSource={staffTableData}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default staffPage;

staffPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

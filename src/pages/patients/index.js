import RootLayout from "@/component/Layouts/RootLayout";
import PatientAuthorizationsTableModal from "@/component/UI/Patients/PatientAuthorizationsTableModal";
import PatientStatusAction from "@/component/UI/Patients/PatientStatusAction";
import { Table } from "antd";
import { useState } from "react";
import { BiCreditCard } from "react-icons/bi";

const PatientPage = () => {
  const [patientId, setPatientId] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  //Auth click event handler
  const handleAuthClick = (id) => {
    console.log(id);
    setModalOpen(true);
    setPatientId(id);
  };

  const items = [
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
    {
      key: "4",
      client_full_name: "Sarah Johnson",
      phone_number: "333-222-1111",
      client_dob: "1995-03-10",
      client_gender: "Female",
      location: "Houston",
      insurance: "8136767092",
      id: "4",
      is_active_client: true,
    },
    {
      key: "5",
      client_full_name: "Michael Brown",
      phone_number: "777-888-9999",
      client_dob: "1980-09-22",
      client_gender: "Male",
      location: "Miami",
      insurance: "813676700092",
      id: "5",
      is_active_client: false,
    },
    {
      key: "6",
      client_full_name: "Linda Miller",
      phone_number: "555-555-5555",
      client_dob: "1972-04-18",
      client_gender: "Female",
      location: "San Francisco",
      insurance: "1234567890",
      id: "6",
      is_active_client: true,
    },
    {
      key: "7",
      client_full_name: "David Clark",
      phone_number: "444-333-2222",
      client_dob: "1988-11-30",
      client_gender: "Male",
      location: "Denver",
      insurance: "9876543210",
      id: "7",
      is_active_client: false,
    },
    {
      key: "8",
      client_full_name: "Emily Davis",
      phone_number: "222-111-3333",
      client_dob: "1992-06-07",
      client_gender: "Female",
      location: "Seattle",
      insurance: "5555555555",
      id: "8",
      is_active_client: true,
    },
    {
      key: "9",
      client_full_name: "Daniel White",
      phone_number: "888-777-6666",
      client_dob: "1982-02-14",
      client_gender: "Male",
      location: "Dallas",
      insurance: "7777777777",
      id: "9",
      is_active_client: true,
    },
    {
      key: "10",
      client_full_name: "Jennifer Lee",
      phone_number: "666-444-9999",
      client_dob: "1991-08-25",
      client_gender: "Female",
      location: "Atlanta",
      insurance: "9999999999",
      id: "10",
      is_active_client: false,
    },
    {
      key: "11",
      client_full_name: "Robert Wilson",
      phone_number: "111-222-3333",
      client_dob: "1987-05-12",
      client_gender: "Male",
      location: "Phoenix",
      insurance: "1111222233",
      id: "11",
      is_active_client: true,
    },
    {
      key: "12",
      client_full_name: "Mary Anderson",
      phone_number: "222-333-4444",
      client_dob: "1986-10-19",
      client_gender: "Female",
      location: "Boston",
      insurance: "2222333444",
      id: "12",
      is_active_client: false,
    },
    {
      key: "13",
      client_full_name: "William Johnson",
      phone_number: "333-444-5555",
      client_dob: "1983-03-08",
      client_gender: "Male",
      location: "Las Vegas",
      insurance: "3333444555",
      id: "13",
      is_active_client: true,
    },
    {
      key: "14",
      client_full_name: "Patricia Smith",
      phone_number: "444-555-6666",
      client_dob: "1979-09-14",
      client_gender: "Female",
      location: "Philadelphia",
      insurance: "4444555666",
      id: "14",
      is_active_client: true,
    },
    {
      key: "15",
      client_full_name: "John Davis",
      phone_number: "555-666-7777",
      client_dob: "1993-12-28",
      client_gender: "Male",
      location: "Detroit",
      insurance: "5555666777",
      id: "15",
      is_active_client: false,
    },
    {
      key: "16",
      client_full_name: "Karen Wilson",
      phone_number: "666-777-8888",
      client_dob: "1984-06-03",
      client_gender: "Female",
      location: "Minneapolis",
      insurance: "6667778888",
      id: "16",
      is_active_client: true,
    },
    {
      key: "17",
      client_full_name: "Richard Jones",
      phone_number: "777-888-9999",
      client_dob: "1977-02-09",
      client_gender: "Male",
      location: "Miami",
      insurance: "7778889999",
      id: "17",
      is_active_client: true,
    },
    {
      key: "18",
      client_full_name: "Nancy Harris",
      phone_number: "888-999-0000",
      client_dob: "1994-04-17",
      client_gender: "Female",
      location: "San Francisco",
      insurance: "8889990000",
      id: "18",
      is_active_client: false,
    },
    {
      key: "19",
      client_full_name: "Michael Brown",
      phone_number: "555-444-3333",
      client_dob: "1975-11-26",
      client_gender: "Male",
      location: "Chicago",
      insurance: "5554443333",
      id: "19",
      is_active_client: true,
    },
    {
      key: "20",
      client_full_name: "Linda Johnson",
      phone_number: "444-333-2222",
      client_dob: "1989-07-13",
      client_gender: "Female",
      location: "Los Angeles",
      insurance: "4443332222",
      id: "20",
      is_active_client: true,
    },
    {
      key: "21",
      client_full_name: "David Wilson",
      phone_number: "333-222-1111",
      client_dob: "1976-08-20",
      client_gender: "Male",
      location: "New York",
      insurance: "3332221111",
      id: "21",
      is_active_client: false,
    },
    {
      key: "22",
      client_full_name: "Susan Davis",
      phone_number: "222-111-0000",
      client_dob: "1990-02-05",
      client_gender: "Female",
      location: "Houston",
      insurance: "2221110000",
      id: "22",
      is_active_client: true,
    },
    {
      key: "23",
      client_full_name: "James Miller",
      phone_number: "111-333-5555",
      client_dob: "1981-03-14",
      client_gender: "Male",
      location: "Dallas",
      insurance: "1113335555",
      id: "23",
      is_active_client: true,
    },
    {
      key: "24",
      client_full_name: "Jessica Smith",
      phone_number: "999-888-7777",
      client_dob: "1974-07-29",
      client_gender: "Female",
      location: "Seattle",
      insurance: "9998887777",
      id: "24",
      is_active_client: false,
    },
    {
      key: "25",
      client_full_name: "Daniel Harris",
      phone_number: "777-555-3333",
      client_dob: "1987-06-10",
      client_gender: "Male",
      location: "Denver",
      insurance: "7775553333",
      id: "25",
      is_active_client: true,
    },
    {
      key: "26",
      client_full_name: "Maria Brown",
      phone_number: "333-444-5555",
      client_dob: "1983-04-22",
      client_gender: "Female",
      location: "Boston",
      insurance: "3334445555",
      id: "26",
      is_active_client: true,
    },
    {
      key: "27",
      client_full_name: "Paul Jones",
      phone_number: "555-666-7777",
      client_dob: "1979-09-05",
      client_gender: "Male",
      location: "Phoenix",
      insurance: "5556667777",
      id: "27",
      is_active_client: false,
    },
    {
      key: "28",
      client_full_name: "Elizabeth Wilson",
      phone_number: "222-111-9999",
      client_dob: "1995-12-31",
      client_gender: "Female",
      location: "Las Vegas",
      insurance: "2221119999",
      id: "28",
      is_active_client: true,
    },
    {
      key: "29",
      client_full_name: "George Davis",
      phone_number: "111-222-3333",
      client_dob: "1992-11-18",
      client_gender: "Male",
      location: "Philadelphia",
      insurance: "1112223333",
      id: "29",
      is_active_client: true,
    },
    {
      key: "30",
      client_full_name: "Anna Johnson",
      phone_number: "999-888-7777",
      client_dob: "1986-05-07",
      client_gender: "Female",
      location: "Minneapolis",
      insurance: "9998887777",
      id: "30",
      is_active_client: false,
    },
    // Add more data entries as needed
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
      title: "Patient",
      dataIndex: "client_full_name",
      key: "client_full_name",
      width: 150,
      filters: generateFilterValues(items, "client_full_name"),
      filterSearch: true, //Filtering value search(Antd new Feature)
      filteredValue: filteredInfo.client_full_name || null,
      onFilter: (value, record) => record.client_full_name.includes(value),
      sorter: (a, b) => {
        return a.client_full_name > b.client_full_name ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "client_full_name" ? sortedInfo.order : null,

      // render contains what we want to reflect as our data
      // client_full_name, id, key=>each row data(object) property value can be accessed.
      render: (_, { client_full_name, id, key }) => {
        //console.log("tags : ", client_full_name, id, key);
        return (
          <div className="">
            <button
              onClick={() => patientDetails(id)}
              className="text-secondary font-medium"
            >
              {client_full_name}
            </button>
          </div>
        );
      },
      // ellipsis: true,
    },
    {
      title: "Contact Info",
      dataIndex: "phone_number",
      key: "phone_number",
      width: 130,
      filters: generateFilterValues(items, "phone_number"),
      filterSearch: true,
      //render contains what we want to reflect as our data
      render: (_, { phone_number }) => {
        return (
          <div>
            <h1>
              {phone_number ? (
                phone_number
              ) : (
                <h1 className="text-red-600">No Data</h1>
              )}
            </h1>
          </div>
        );
      },
      filteredValue: filteredInfo.phone_number || null,
      onFilter: (value, record) => {
        if (record?.phone_number !== null) {
          return record.phone_number.includes(value);
        }
      },
      sorter: (a, b) => {
        return a.phone_number > b.phone_number ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "phone_number" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "DOB",
      dataIndex: "client_dob",
      key: "client_dob",
      width: 100,
      filters: generateFilterValues(items, "client_dob"),
      filterSearch: true,
      //render contains what we want to reflect as our data
      render: (_, { client_dob }) => {
        return (
          <div>
            <h1>
              {client_dob ? (
                client_dob
              ) : (
                <h1 className="text-red-600">No Data</h1>
              )}
            </h1>
          </div>
        );
      },
      filteredValue: filteredInfo.client_dob || null,
      onFilter: (value, record) => {
        if (record?.client_dob !== null) {
          return record.client_dob.includes(value);
        }
      },
      //   sorter is for sorting asc or dsc purpose
      sorter: (a, b) => {
        return a.client_dob > b.client_dob ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "client_dob" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Gender",
      dataIndex: "client_gender",
      key: "client_gender",
      width: 100,
      filters: generateFilterValues(items, "client_gender"),
      filterSearch: true,
      filteredValue: filteredInfo.client_gender || null,
      onFilter: (value, record) => record.client_gender.includes(value),
      //   sorter is for sorting asc or dsc purpose
      sorter: (a, b) => {
        return a.client_gender > b.client_gender ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "client_gender" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "POS",
      dataIndex: "location",
      key: "location",
      width: 100,
      filters: generateFilterValues(items, "location"),
      filterSearch: true,
      render: (_, { location }) => {
        return (
          <div>
            <h1>
              {location ? location : <h1 className="text-red-600">No Data</h1>}
            </h1>
          </div>
        );
      },
      filteredValue: filteredInfo.location || null,
      onFilter: (value, record) => {
        // console.log(value);
        if (record?.location !== null) {
          return record.location.includes(value);
        }
      },
      //   sorter is for sorting asc or dsc purpose
      sorter: (a, b) => {
        return a.location > b.location ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "location" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Insurance",
      dataIndex: "insurance",
      key: "insurance",
      width: 100,
      filters: generateFilterValues(items, "insurance"),
      filterSearch: true,
      render: (_, { insurance }) => {
        return <div className="flex justify-end px-1">{insurance}</div>;
      },
      filteredValue: filteredInfo.insurance || null,
      onFilter: (value, record) => record.insurance.includes(value),
      //   sorter is for sorting asc or dsc purpose
      sorter: (a, b) => {
        return a.insurance > b.insurance ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "insurance" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Auth",
      key: "id",
      dataIndex: "id",
      width: 50,
      render: (_, { id }) => {
        return (
          <div className="flex justify-center">
            <button
              onClick={() => {
                handleAuthClick(id);
              }}
              className="flex justify-center"
            >
              <BiCreditCard className="text-xl  text-secondary" />
            </button>
          </div>
        );
      },
    },
    {
      title: "Status",
      key: "is_active_client",
      dataIndex: "is_active_client",
      width: 100,
      render: (_, { is_active_client }) => {
        //console.log("Status : ", Status);
        return (
          <div className="flex justify-center">
            <PatientStatusAction
              status={is_active_client}
            ></PatientStatusAction>
            {is_active_client}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h1 className="text-lg text-orange-500 text-left font-semibold mb-5">
        Patient
      </h1>
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

      {modalOpen && (
        <PatientAuthorizationsTableModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        ></PatientAuthorizationsTableModal>
      )}
    </div>
  );
};

export default PatientPage;

PatientPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

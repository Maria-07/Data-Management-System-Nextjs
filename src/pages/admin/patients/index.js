/* eslint-disable react-hooks/rules-of-hooks */
import { getAccessToken } from "@/Redux/api/apiSlice";
import RootLayout from "@/component/Layouts/RootLayout";
import Loading from "@/component/UI/Layouts/Loading";
import PatientAuthorizationsTableModal from "@/component/UI/Patients/PatientAuthorizationsTableModal";
import PatientStatusAction from "@/component/UI/Patients/PatientStatusAction";
import { Table } from "antd";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiCreditCard } from "react-icons/bi";

const PatientPage = () => {
  const [patientId, setPatientId] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const token = getAccessToken();
  const [data, setData] = useState([]);
  const [patients, setPatients] = useState([]);

  //! get data from API + data fetch from api while scrolling[Important]
  useEffect(() => {
    const getPatientsData = async () => {
      let res = await axios({
        method: "post",
        url: `https://stagapi.therapypms.com/api/v1/inadmin/patient/list`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-auth-token": token,
        },
        data: {
          page: 1,
        },
      });
      const data = res?.data?.data?.data;
      console.log(res);
      setPatients(data);
    };
    getPatientsData();
  }, [token]);

  console.log(patients);

  //Auth click event handler
  const handleAuthClick = (id) => {
    console.log(id);
    setModalOpen(true);
    setPatientId(id);
  };

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
      filters: generateFilterValues(patients, "client_full_name"),
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
          <Link href={`/patients/patient-info/${id}`} className="">
            <button className="text-secondary font-medium">
              {client_full_name}
            </button>
          </Link>
        );
      },
      // ellipsis: true,
    },
    {
      title: "Contact Info",
      dataIndex: "phone_number",
      key: "phone_number",
      width: 130,
      filters: generateFilterValues(patients, "phone_number"),
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
      filters: generateFilterValues(patients, "client_dob"),
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
      filters: generateFilterValues(patients, "client_gender"),
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
      filters: generateFilterValues(patients, "location"),
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
      filters: generateFilterValues(patients, "insurance"),
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
          dataSource={patients} //Which data chunk you want to show in table
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

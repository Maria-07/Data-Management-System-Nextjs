/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { getAccessToken } from "@/Redux/api/apiSlice";
import RootLayout from "@/component/Layouts/RootLayout";
import Loading from "@/component/UI/Layouts/Loading";
import TableShimmer from "@/component/UI/Layouts/Shimmer/TableShimmer";
import PatientAuthorizationsTableModal from "@/component/UI/Patients/PatientAuthorizationsTableModal";
import PatientStatusAction from "@/component/UI/Patients/PatientStatusAction";
import { Table } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiCreditCard } from "react-icons/bi";
import InfiniteScroll from "react-infinite-scroll-component";

const PatientPage = () => {
  const router = useRouter();
  const [patientId, setPatientId] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const token = getAccessToken();
  const [patients, setPatients] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(true);

  //! fetch all patients using InfiniteScrolling
  const fetchPatients = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_URL}/patient/list`,
        {
          page,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            method: "POST",
            //"x-auth-token": token,
            Authorization: token || null,
          },
        }
      );
      setSearchLoading(false);
      const data = response?.data?.patients?.data;
      //console.log('patients-data',data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const fetchData = async () => {
    const patientsFromServer = await fetchPatients();
    console.log("patients - data", patientsFromServer);

    if (patientsFromServer.length > 0) {
      setPatients([...patients, ...patientsFromServer]);
      setPage(page + 1);
    } else {
      setHasMore(false); // No more data to load
    }
  };

  useEffect(() => {
    fetchData(); // Fetch initial data
  }, []);
  //! fetch all patients using InfiniteScrolling END
  //! Auth click event handler
  const handleAuthClick = (id) => {
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

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const PIdHandler = (id) => {
    console.log(id, "iddddddddddd");
    if (id) {
      localStorage.setItem("PId", id);
      router.push(`/provider/patients/patient-info/${id}`);
    }
  };
  function formatDate(inputDate) {
    // expects Y-m-d
    var splitDate = inputDate.split("-");
    if (splitDate.count == 0) {
      return null;
    }

    var year = splitDate[0];
    var month = splitDate[1];
    var day = splitDate[2];

    return month + "/" + day + "/" + year;
  }
  if (searchLoading) {
    return <TableShimmer></TableShimmer>;
  }
  const columns = [
    {
      title: "Patient",
      dataIndex: "patient_full_name",
      key: "patient_full_name",
      width: 150,
      /*filters: generateFilterValues(patients, "patient_first_name"),
      filterSearch: true, //Filtering value search(Antd new Feature)
      filteredValue: filteredInfo.patient_first_name || null,
      onFilter: (value, record) => record.patient_first_name.includes(value),
      sorter: (a, b) => {
        return a.patient_first_name > b.patient_first_name ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "patient_first_name" ? sortedInfo.order : null,*/

      // render contains what we want to reflect as our data
      // client_full_name, id, key=>each row data(object) property value can be accessed.
      render: (_, record) => {
        //console.log("tags : ", record);
        return (
          // <Link href={`/admin/patients/patient-info/${id}`} className="">
          <button
            onClick={() => PIdHandler(record.patient_id)}
            className="text-secondary font-medium"
          >
            {record.patient_last_name}, {record.patient_first_name}
          </button>
          // </Link>
        );
      },
      // ellipsis: true,
    },
    /*{
      title: "Wait List",
      key: "wait_list",
      dataIndex: "wait_list",
      width: 100,
      render: (_, { wait_list }) => {
        //console.log("Status : ", Status);
        return (
          <div className="flex justify-center">
            <select
              // defaultValue={s}
              // onChange={(e) => handle status(e)}
              className="border w-full rounded-md lg:px-5 py-[4px]  text-center"
            >
              <option value="1">Yes</option>
              <option value="2">No</option>
            </select>
          </div>
        );
      },
    },*/
    {
      title: "Contact Info",
      dataIndex: "patient_phone_number",
      key: "patient_phone_number",
      width: 130,
      //filters: generateFilterValues(patients, "patient_phone_number"),
      //filterSearch: true,
      //render contains what we want to reflect as our data
      render: (_, { patient_phone_number }) => {
        return (
          <div>
            <h1>
              {patient_phone_number ? (
                patient_phone_number
              ) : (
                <h1 className="text-red-600">-</h1>
              )}
            </h1>
          </div>
        );
      },
      /*filteredValue: filteredInfo.patient_phone_number || null,
      onFilter: (value, record) => {
        if (record?.patient_phone_number !== null) {
          return record.patient_phone_number.includes(value);
        }
      },
      sorter: (a, b) => {
        return a.patient_phone_number > b.patient_phone_number ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "patient_phone_number" ? sortedInfo.order : null,
      ellipsis: true,*/
    },
    {
      title: "DOB",
      dataIndex: "patient_dob",
      key: "patient_dob",
      width: 100,
      //filters: generateFilterValues(patients, "patient_dob"),
      //filterSearch: true,
      //render contains what we want to reflect as our data
      render: (_, { patient_dob }) => {
        return (
          <div>
            <h1>
              {patient_dob ? (
                formatDate(patient_dob)
              ) : (
                <h1 className="text-red-600">-</h1>
              )}
            </h1>
          </div>
        );
      },
      /*filteredValue: filteredInfo.client_dob || null,
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
      ellipsis: true,*/
    },
    {
      title: "Gender",
      dataIndex: "patient_gender",
      key: "patient_gender",
      width: 100,
      /*filters: generateFilterValues(patients, "patient_gender"),
      filterSearch: true,
      filteredValue: filteredInfo.client_gender || null,
      onFilter: (value, record) => record.client_gender.includes(value),
      //   sorter is for sorting asc or dsc purpose
      sorter: (a, b) => {
        return a.patient_gender > b.patient_gender ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "patient_gender" ? sortedInfo.order : null,
      ellipsis: true,*/
    },
    {
      title: "POS",
      dataIndex: "patient_POS",
      key: "patient_POS",
      width: 100,
      /*filters: generateFilterValues(patients, "location"),
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
      ellipsis: true,*/
    },
    {
      title: "Insurance",
      dataIndex: "patient_payor",
      key: "patient_payor",
      width: 100,
      /*filters: generateFilterValues(patients, "insurance"),
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
      ellipsis: true,*/
    },
    {
      title: "Auth",
      key: "id",
      dataIndex: "id",
      width: 50,
      render: (_, record) => {
        return (
          <div className="flex justify-center">
            <button
              onClick={() => {
                handleAuthClick(record.patient_id);
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
      key: "patient_active_status",
      dataIndex: "patient_active_status",
      width: 100,
      render: (_, { patient_active_status }) => {
        //console.log("Status : ", Status);
        return (
          <div className="flex justify-center">
            <PatientStatusAction
              s={patient_active_status}
            ></PatientStatusAction>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex items-center flex-wrap justify-between gap-2 mt-2 mb-5">
        <div className="flex items-center gap-3">
          <h1 className="text-lg text-orange-500 text-left font-semibold ">
            All Patients
          </h1>
        </div>
      </div>
      <InfiniteScroll
        dataLength={patients.length} //items is basically all data here
        next={patients?.length > 0 && fetchData} //This condition is mendatory for perfectly working with infinite scrolling
        hasMore={hasMore}
        loader={<TableShimmer></TableShimmer>}
      >
        <Table
          bordered
          rowKey="id"
          pagination={false}
          size="small"
          className="table-striped-rows text-xs font-normal"
          columns={columns}
          dataSource={patients}
          onChange={handleChange}
        />
      </InfiniteScroll>
      {modalOpen && (
        <PatientAuthorizationsTableModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          token={token}
          patient_id={patientId}
        ></PatientAuthorizationsTableModal>
      )}
    </div>
  );
};

export default PatientPage;

PatientPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

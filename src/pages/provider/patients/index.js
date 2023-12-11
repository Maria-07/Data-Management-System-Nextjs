/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { getAccessToken } from "@/Redux/api/apiSlice";
import RootLayout from "@/component/Layouts/RootLayout";
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

  //! fetch all patients using InfiniteScrolling
  const fetchPatients = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/patient/list`,
        {
          page,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-auth-token": token,
          },
        }
      );
      const data = response?.data?.data?.data;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const fetchData = async () => {
    const patientsFromServer = await fetchPatients();

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

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const PIdHandler = (id) => {
    console.log(id, "iddddddddddd");
    if (id) {
      localStorage.setItem("PId", id);
      router.push(`/admin/patients/patient-info/${id}`);
    }
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
          // <Link href={`/admin/patients/patient-info/${id}`} className="">
          <button
            onClick={() => PIdHandler(id)}
            className="text-secondary font-medium"
          >
            {client_full_name}
          </button>
          // </Link>
        );
      },
      // ellipsis: true,
    },
    {
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
            <PatientStatusAction s={is_active_client}></PatientStatusAction>
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
            Patient
          </h1>
          <div>
            <button className="text-[11px]  bg-green-700 font-semibold px-2 py-[2px] rounded-md text-white shadow-sm">
              Active 5
            </button>
            <button className="text-[11px] ml-2 bg-gray-200 font-semibold px-2 py-[2px] rounded-md text-fontC shadow-sm">
              In-Active 5
            </button>
          </div>
        </div>

        <div>
          <button onClick={clearFilters} className="dtm-button">
            Clear filters
          </button>
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

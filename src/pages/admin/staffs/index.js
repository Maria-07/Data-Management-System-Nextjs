/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { getAccessToken } from "@/Redux/api/apiSlice";
import RootLayout from "@/component/Layouts/RootLayout";
import TableShimmer from "@/component/UI/Layouts/Shimmer/TableShimmer";
import { Dropdown, Table } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiCreditCard } from "react-icons/bi";
import { BsPersonLinesFill, BsPersonPlusFill } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";

const staffPage = () => {
  const router = useRouter();
  const [patientId, setPatientId] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const token = getAccessToken();
  const [providers, setProviders] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  //! fetch all providers using InfiniteScrolling
  const fetchProviders = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/provider/list`,
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
      const data = response?.data?.providerData?.data;
      console.log("data data", response?.data?.providerData?.data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  // const fetchData = async () => {
  //   const providersFromServer = await fetchProviders();
  //   //console.log(providersFromServer);
  //   setStaffData([...staffData, ...providersFromServer]);
  //   if (providersFromServer.length === 0) {
  //     setHasMore(false);
  //   }
  //   setPage(page + 1);
  // };
  // console.log("final total staffs", staffData);

  const fetchData = async () => {
    const providersFromServer = await fetchProviders();
    console.log(providersFromServer);

    if (providersFromServer.length > 0) {
      setProviders([...providers, ...providersFromServer]);
      setPage(page + 1);
    } else {
      setHasMore(false); // No more data to load
    }
  };

  useEffect(() => {
    fetchData(); // Fetch initial data
  }, []);
  //! fetch all providers using InfiniteScrolling END

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

  const SIdHandler = (id) => {
    console.log(id, "iddddddddddd");
    if (id) {
      localStorage.setItem("SId", id);
      router.push(`/admin/staffs/staff-bio/${id}`);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
      width: 150,
      filters: generateFilterValues(providers, "full_name"),
      filterSearch: true, //Filtering value search(Antd new Feature)
      filteredValue: filteredInfo.full_name || null,
      onFilter: (value, record) => record.full_name.includes(value),
      render: (_, { full_name, id }) => {
        // console.log("tags : ", Name, id);
        return (
          <button
            onClick={() => SIdHandler(id)}
            className="text-secondary font-medium"
          >
            {full_name}
          </button>
        );
      },
      filteredValue: filteredInfo.full_name || null,
      onFilter: (value, record) => record.full_name.includes(value),
      sorter: (a, b) => {
        return a.full_name > b.full_name ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "full_name" ? sortedInfo.order : null,
      ellipsis: false,
    },
    {
      title: "Credential Type",
      dataIndex: "credential_type",
      key: "credential_type",
      width: 150,
      filters: generateFilterValues(providers, "credential_type"),
      filterSearch: true, //Filtering value search(Antd new Feature)
      filteredValue: filteredInfo.credential_type || null,
      onFilter: (value, record) => record.credential_type.includes(value),
      render: (_, record) => {
        // console.log("tags : ", Name, id);
        return (
          <div>
            {record?.employeeTypeAssign?.type_name || (
              <h1 className="text-red-500">Not Assigned Yet</h1>
            )}
          </div>
        );
      },
      sorter: (a, b) => {
        return a.credential_type > b.credential_type ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "credential_type" ? sortedInfo.order : null,
      ellipsis: false,
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
      filters: generateFilterValues(providers, "office_phone"),
      filterSearch: true, //Filtering value search(Antd new Feature)
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
      filters: generateFilterValues(providers, "office_email"),
      filterSearch: true, //Filtering value search(Antd new Feature)
      filteredValue: filteredInfo.office_email || null,
      onFilter: (value, record) => record.office_email.includes(value),
      //   sorter is for sorting asc or dsc purpose
      sorter: (a, b) => {
        return a.Email > b.Email ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "Email" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      width: 100,
      filters: generateFilterValues(providers, "language"),
      filterSearch: true, //Filtering value search(Antd new Feature)
      filteredValue: filteredInfo.language || null,
      onFilter: (value, record) => record.language.includes(value),
      sorter: (a, b) => {
        return a.Language > b.Language ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "Language" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Scheduled",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (_, { Status }) => {
        //console.log("Status : ", Status);
        return (
          <Link
            href="/admin"
            className=" text-secondary flex items-center justify-center"
          >
            View
          </Link>
        );
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
        return (
          <></>
          // <StuffStatusAction
          //   id={id}
          //   status={is_active}
          //   setStaffData={setStaffData}
          //   setCall={setCall}
          //   setHasMore={setHasMore}
          //   setPage={setPage}
          // ></StuffStatusAction>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex items-center flex-wrap justify-between gap-2 mt-2 mb-5">
        <h1 className="text-lg text-orange-500 text-left font-semibold ">
          Patient
        </h1>
        <div className="flex items-center gap-3">
          <button onClick={clearFilters} className="dtm-button">
            Clear filters
          </button>
          <div>
            <Dropdown
              dropdownRender={() => (
                <div className="bg-white p-2 border shadow-md rounded-md">
                  <Link href={`/admin/staffs/create-provider`}>
                    <button className="text-[14px] text-secondary border px-[20px] py-1 mb-2 rounded-sm border-secondary hover:text-white hover:bg-secondary mx-auto flex items-center font-semibold gap-2">
                      <div className="flex items-center">
                        <BsPersonPlusFill className="mr-2" />
                        Provider (Therapist)
                      </div>
                    </button>
                  </Link>

                  <Link href={"/admin/create-staff/officeStaff"}>
                    <button className="text-[14px] text-secondary border px-12 py-1 mx-auto rounded-sm border-secondary hover:text-white hover:bg-secondary flex items-center font-semibold gap-2">
                      <div className="flex items-center">
                        <BsPersonLinesFill className="mr-2" />
                        Office Staff
                      </div>
                    </button>
                  </Link>
                </div>
              )}
              placement="bottomRight"
              arrow
            >
              <button type="" className="dtm-button">
                Add Staff
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={providers.length} //items is basically all data here
        next={providers?.length > 0 && fetchData} //This condition is mendatory for perfectly working with infinite scrolling
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
          dataSource={providers}
          onChange={handleChange}
        />
      </InfiniteScroll>
    </div>
  );
};

export default staffPage;

staffPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

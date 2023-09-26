/* eslint-disable react-hooks/rules-of-hooks */
import PatientLayout from "@/component/Layouts/PatientLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import { Table } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const PatientVob = () => {
  const [allData, setAllData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  //   fetch data
  useEffect(() => {
    fetch("../../../All_Fake_Api/facility_nameLeadger.json")
      .then((res) => res.json())
      .then((d) => {
        setAllData(d);
        // setLoading2(false);
      });
  }, []);

  console.log(allData);

  const column = [
    {
      title: "facility_name",
      dataIndex: "facility_name",
      key: "facility_name",
      width: 100,
      filters: [{}],
      filteredValue: filteredInfo.facility_name || null,
      onFilter: (value, record) => record.facility_name.includes(value),
      sorter: (a, b) => {
        return a.facility_name > b.facility_name ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "Facility Name" ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, { facility_name }) => {
        return (
          <div>
            <Link
              className="font-normal text-secondary"
              href={"/admin/facility_name-List"}
            >
              hi
            </Link>
          </div>
        );
      },
    },
    {
      index: 2,
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 80,
      filters: [
        {
          text: "Malesuada",
          value: "Malesuada",
        },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      //   sorter is for sorting asc or dsc purrequested_datee
      sorter: (a, b) => {
        return a.name > b.name ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "DOB",
      key: "DOB",
      dataIndex: "DOB",
      width: 80,
      filters: [{}],
      filteredValue: filteredInfo.DOB || null,
      onFilter: (value, record) => record.DOB.includes(value),
      //   sorter is for sorting asc or dsc purrequested_datee
      sorter: (a, b) => {
        return a.DOB > b.DOB ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "DOB" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Requested Date",
      key: "requested_date",
      dataIndex: "requested_date",
      width: 100,
      filters: [{}],
      filteredValue: filteredInfo.requested_date || null,
      onFilter: (value, record) => record.requested_date.includes(value),
      //   sorter is for sorting asc or dsc purrequested_datee
      sorter: (a, b) => {
        return a.requested_date > b.requested_date ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "requested_date" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Requested by",
      key: "requested_by",
      dataIndex: "requested_by",
      width: 100,
      filters: [{}],
      filteredValue: filteredInfo.requested_date || null,
      onFilter: (value, record) => record.requested_date.includes(value),
      //   sorter is for sorting asc or dsc purrequested_datee
      sorter: (a, b) => {
        return a.requested_date > b.requested_date ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "requested_by" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Reviewed By",
      key: "reviewed_By",
      dataIndex: "reviewed_By",
      width: 100,
      filters: [{}],
      filteredValue: filteredInfo.reviewed_By || null,
      onFilter: (value, record) => record.reviewed_By.includes(value),
      //   sorter is for sorting asc or dsc purrequested_datee
      sorter: (a, b) => {
        return a.reviewed_By > b.reviewed_By ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "reviewed_By" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "status",
      key: "status",
      dataIndex: "status",
      width: 70,
      filters: [{}],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status.includes(value),
      //   sorter is for sorting asc or dsc purrequested_datee
      sorter: (a, b) => {
        return a.status > b.status ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, { status }) => {
        //console.log("Status : ", Status);
        return <div className="flex justify-end">{status}</div>;
      },
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      width: 90,
      render: (_, { nt }) => {
        // return <facility_nameLedgerAction></facility_nameLedgerAction>;
        <div className="flex justify-center">
          <h1>hihihi</h1>
        </div>;
      },
    },
  ];

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };
  return (
    <div>
      {" "}
      <div className="">
        <h1 className="text-lg mt-2 text-orange-500">VOB Request</h1>
        <div className="my-2">
          <div className="flex justify-end items-center gap-2 mr-2">
            <button onClick={clearFilters} className="dcm-close-button">
              Clear filters
            </button>
            <div className="">
              <button
                // onClick={handleClickOpen}
                className="dtm-button flex item-center gap-2"
              >
                <AiOutlinePlus className="text-lg mt-1 text-white" />
                <span>Add New Data</span>
              </button>
            </div>
          </div>

          <div className=" overflow-scroll py-3">
            <Table
              pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
              size="small"
              bordered
              className=" text-xs font-normal "
              columns={column}
              dataSource={allData}
              // scroll={{
              //   y: 700,
              // }}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientVob;

PatientVob.getLayout = function getLayout(page) {
  const router = useRouter();
  const { query } = router;
  const id = query.PatientVob;
  return (
    <RootLayout>
      <PatientLayout id={id}>{page}</PatientLayout>
    </RootLayout>
  );
};

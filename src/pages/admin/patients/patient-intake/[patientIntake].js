import PatientLayout from "@/component/Layouts/PatientLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import ReviewStatus from "@/component/UI/Patients/Patients/PatientIntake/ReviewStatus";
import { Table } from "antd";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { IoAlertCircleSharp } from "react-icons/io5";

const PatientIntake = () => {
  const [allData, setAllData] = useState([
    {
      id: 1,
      first_name: "Bernardine",
      last_name: "Huyge",
      dob: "3/19/2022",
      gurantor: "Vervet monkey",
    },
    {
      id: 2,
      first_name: "Evaleen",
      last_name: "Sessuns",
      dob: "3/15/2022",
      gurantor: "Fox, north american red",
    },
    {
      id: 3,
      first_name: "Rollo",
      last_name: "Downham",
      dob: "11/18/2021",
      gurantor: "Ferret, black-footed",
    },
    {
      id: 4,
      first_name: "Lauren",
      last_name: "Hechlin",
      dob: "5/31/2022",
      gurantor: "Crab, sally lightfoot",
    },
    {
      id: 5,
      first_name: "Cletis",
      last_name: "Wrighton",
      dob: "12/22/2021",
      gurantor: "Southern ground hornbill",
    },
    {
      id: 6,
      first_name: "Wandie",
      last_name: "Hulson",
      dob: "12/2/2021",
      gurantor: "Nilgai",
    },
    {
      id: 7,
      first_name: "Alvie",
      last_name: "Piell",
      dob: "12/12/2021",
      gurantor: "Whale, long-finned pilot",
    },
    {
      id: 8,
      first_name: "Lorrie",
      last_name: "D'Elias",
      dob: "6/14/2022",
      gurantor: "Coot, red-knobbed",
    },
    {
      id: 9,
      first_name: "Towney",
      last_name: "Priscott",
      dob: "6/2/2022",
      gurantor: "Monkey, bleeding heart",
    },
    {
      id: 10,
      first_name: "Dian",
      last_name: "Thurlbeck",
      dob: "1/8/2022",
      gurantor: "Seal, harbor",
    },
  ]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [assign, setAssign] = useState(false);

  // console.log(allData);

  const column = [
    {
      title: "From Name",
      dataIndex: "description",
      key: "description",
      width: 120,
      filters: [{}],
      filteredValue: filteredInfo.Document || null,
      onFilter: (value, record) => record.Document.includes(value),
      sorter: (a, b) => {
        return a.Document > b.Document ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "Document" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Assign",
      dataIndex: "description",
      key: "description",
      width: 120,
      filters: [{}],
      filteredValue: filteredInfo.Document || null,
      onFilter: (value, record) => record.Document.includes(value),
      sorter: (a, b) => {
        return a.Document > b.Document ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "Document" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "Submitted",
      dataIndex: "operation",
      key: "operation",
      width: 90,
      render: (_, { nt }) => {
        return (
          <div className="flex justify-center">
            <IoAlertCircleSharp className="text-rose-500 text-lg" />
          </div>
        );
      },
    },
    {
      title: "Review Status",
      dataIndex: "operation",
      key: "operation",
      width: 110,
      render: (_, { nt }) => {
        return <ReviewStatus></ReviewStatus>;
      },
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      width: 90,
      render: (_, { nt }) => {
        return (
          <div className="flex items-center justify-center">
            <AiOutlineEye />
          </div>
        );
      },
    },
  ];

  const handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };
  return (
    <div>
      <div className="">
        <h1 className="text-lg mt-2 text-orange-500">Intake Form Uploads</h1>
        <div className="my-2">
          <div className="flex justify-end items-center mr-2">
            <button
              onClick={clearFilters}
              className="px-2  py-[7px] bg-white from-bg-primary text-xs  hover:bg-secondary text-secondary hover:text-white border border-secondary rounded-sm"
            >
              Clear filters
            </button>
          </div>

          <div className=" overflow-scroll py-3">
            <Table
              pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
              size="small"
              bordered
              className=" text-xs font-normal "
              columns={column}
              dataSource={allData}
              scroll={{
                y: 700,
              }}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientIntake;

PatientIntake.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <PatientLayout>{page}</PatientLayout>
    </RootLayout>
  );
};

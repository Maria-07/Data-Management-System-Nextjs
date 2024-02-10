import { Dropdown, Table } from "antd";
import React, { useState } from "react";
import ManageTableAction from "../../DataRecording/Modals/ManageTableAction";
import { BsFillCameraVideoFill, BsThreeDots } from "react-icons/bs";
import { AiFillLock, AiFillUnlock, AiOutlineMessage } from "react-icons/ai";

const ListViewTable = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [items, setItems] = useState([]);

  //get rows id to do some action on them
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selected row-keys: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,

    //Billing is_locked===true then you can't chose that checkbox
    getCheckboxProps: (record) => {
      //console.log("record", record);
      const rowIndex = record?.is_locked;
      return {
        disabled: rowIndex === 1,
      };
    },
  };

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  console.log("----", filteredInfo);

  const clearFilters = (e) => {
    e.preventDefault();
    setFilteredInfo({});
  };

  // Table Data Columns Defined Here //
  const columns = [
    {
      title: <h1 className="text-center">Lock</h1>,
      key: "is_locked",
      dataIndex: "is_locked",
      width: 80,
      // render contains what we want to reflect as our data
      render: (_, { is_locked }) => {
        //console.log("tags : ", lock);
        return (
          <div className="flex justify-center">
            {is_locked === 0 && (
              <button title="Un-Lock">
                <AiFillUnlock className=" text-lg font-medium text-[#309BAB]" />
              </button>
            )}
            {is_locked === 1 && (
              <button title="Billed">
                <AiFillLock className="text-lg font-medium  text-red-600" />
              </button>
            )}
          </div>
        );
      },
    },
    {
      title: "Patients",
      dataIndex: "client_full_name",
      key: "client_full_name",
      width: 200,
      // filters: items?.length > 0 && patientSearch(),
      render: (_, record) => {
        //console.log("tags : ", lock);
        return (
          <div className="text-secondary">
            {record?.app_patient?.client_full_name}
          </div>
        );
      },
      // filteredValue: filteredInfo.client_full_name || null,
      // onFilter: (value, record) =>
      //   record?.app_client?.client_full_name?.includes(value),
      sorter: (a, b) => {
        return a.app_client?.client_full_name > b.app_client?.client_full_name
          ? -1
          : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "client_full_name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Service & Hrs",
      dataIndex: "activity_name",
      key: "activity_name",
      width: 190,
      render: (_, record) => {
        //console.log("tags : ", lock);
        return (
          <div className=" text-secondary">
            {record?.app_activity?.activity_name}
          </div>
        );
      },
      //   sorter is for sorting asc or dsc purpose
      sorter: (a, b) => {
        return a?.app_activity?.activity_name > b?.app_activity?.activity_name
          ? -1
          : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "activity_name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Provider",
      dataIndex: "provider_full_name",
      key: "provider_full_name",
      width: 160,
      render: (_, record) => {
        return (
          <div className=" text-secondary">
            {record?.app_provider?.full_name}
          </div>
        );
      },
      sorter: (a, b) => {
        return a.app_provider?.full_name > b.app_provider?.full_name ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "provider_full_name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Pos",
      key: "location",
      dataIndex: "location",
      width: 150,
      render: (_, { location }) => {
        //console.log("pos : ", pos);
        return (
          <>
            {location === "02" ? (
              <div className="flex items-center justify-center gap-2 ">
                Telehealth
                <BsFillCameraVideoFill className="text-green-500" />
              </div>
            ) : (
              <div>
                {
                  posData?.pos?.find((each) => each?.pos_code === location)
                    ?.pos_name
                }
              </div>
            )}
          </>
        );
      },
      // filteredValue: filteredInfo.location || null,
      // onFilter: (value, record) => record.location.includes(value),
      sorter: (a, b) => {
        return a.location > b.location ? -1 : 1;
      },

      sortOrder: sortedInfo.columnKey === "location" ? sortedInfo.order : null,
    },
    {
      title: "Scheduled Date",
      dataIndex: "schedule_date",
      key: "schedule_date",
      width: 200,
      // filters: [
      //   {
      //     text: `Feb 20, 2023`,
      //     value: "Feb 20, 2023",
      //   },
      //   {
      //     text: "Dec 30, 2021",
      //     value: "Dec 30, 2021",
      //   },
      // ],
      render: (_, record) => {
        //console.log("tags : ", lock);
        return (
          <div className=" text-black text-center">
            {dateConverter(record?.schedule_date)}
          </div>
        );
      },
      // filteredValue: filteredInfo.schedule_date || null,
      // onFilter: (value, record) => record.schedule_date.includes(value),
      sorter: (a, b) => {
        return a.schedule_date > b.schedule_date ? -1 : 1;
        // a.schedule_date - b.schedule_date
      },
      sortOrder:
        sortedInfo.columnKey === "schedule_date" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Hours",
      dataIndex: "Hours",
      key: "Hours",
      width: 200,
      // filters: [
      //   {
      //     text: `9:57 PM`,
      //     value: "9:57 PM",
      //   },
      //   {
      //     text: "3:01 PM",
      //     value: "3:01 PM",
      //   },
      // ],
      render: (_, record) => {
        //console.log("tags : ", lock);
        return (
          <div className=" text-gray-600 text-center">
            {timeConverter2(record?.from_time)} to{" "}
            {timeConverter2(record?.to_time)}
          </div>
        );
      },
      // filteredValue: filteredInfo.Hours || null,
      // onFilter: (value, record) => {
      //   return record.Hours.includes(value);
      // },
      sorter: (a, b) => {
        return a.Hours > b.Hours ? -1 : 1;
        // a.Hours - b.Hours,
      },
      sortOrder: sortedInfo.columnKey === "Hours" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: 110,
      sorter: (a, b) => {
        return a.status > b.status ? -1 : 1;
        // a.status - b.status,
      },
      sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, { status }) => {
        //console.log("status : ", status);
        return (
          <div className="flex justify-center">
            {status === "Scheduled" && (
              <button className="bg-gray-500 text-white text-[10px] py-[2px]  rounded w-14">
                {status}
              </button>
            )}
            {status === "Rendered" && (
              <button className="bg-green-700 text-white text-[10px] py-[2px]  rounded w-14">
                {status}
              </button>
            )}
            {status === "Hold" && (
              <button className="bg-gray-100 text-black text-[10px] py-[2px]  rounded w-14">
                {status}
              </button>
            )}
            {status === "No Show" && (
              <button className="bg-rose-700 text-white text-[10px] py-[2px]  rounded w-14">
                {status}
              </button>
            )}
            {status === "Cancelled by Client" && (
              <button className="bg-secondary text-white text-[10px] py-[2px]  rounded w-24">
                {status}
              </button>
            )}
            {status === "Cancelled by Provider" && (
              <button className="bg-[#39B4C7] text-white text-[10px] p-[2px]  rounded w-28">
                {status}
              </button>
            )}
          </div>
        );
      },
      // filters: [
      //   {
      //     text: "hold",
      //     value: "hold",
      //   },
      //   {
      //     text: "Rendered",
      //     value: "Rendered",
      //   },
      //   {
      //     text: "Scheduled",
      //     value: "Scheduled",
      //   },
      // ],
      // filteredValue: filteredInfo.status || null,
      // onFilter: (value, record) => record.status.includes(value),
    },
    {
      title: "Nt",
      dataIndex: "operation",
      key: "operation",
      width: 60,
      render: (_, record) => (
        <div className="flex justify-center">
          <button
            className="flex items-center justify-center "
            onClick={addNoteHandler}
          >
            <AiOutlineMessage className="text-base text-secondary" />
          </button>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      width: 80,
      render: (_, record) => (
        <div className="flex justify-center">
          <Dropdown
            overlay={
              <ManageTableAction
                isLocked={record?.is_locked}
                appointmentId={record?.id}
              ></ManageTableAction>
            }
            trigger={["click"]}
            overlayStyle={{ zIndex: "100" }}
          >
            <button onClick={(e) => e.preventDefault()}>
              <>
                <BsThreeDots />
              </>
            </button>
          </Dropdown>
        </div>
      ),
    },
  ];
  return (
    <div>
      {" "}
      <Table
        pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
        rowKey={(record) => record.id} //record is kind of whole one data object and here we are assigning id as key
        size="small"
        bordered
        className=" text-xs font-normal"
        columns={columns}
        // dataSource={sessionlist}
        dataSource={items}
        rowSelection={rowSelection}
        scroll={{
          y: 750,
        }}
        onChange={handleChange}
      />
    </div>
  );
};

export default ListViewTable;

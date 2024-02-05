import { Modal, Table } from "antd";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const LinkToAppointment = ({ handleClose, open }) => {
  //! table config --------------------------------
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    //   setFilteredInfo(filters);
    //   setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
    },
    onSelect: (record, selected, selectedRows) => {
      // console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      // console.log(selected, selectedRows, changeRows);
    },
  };

  const column = [
    {
      title: "Schedule Start",
      dataIndex: "Schedule_start",
      key: "Schedule_start",
      width: 100,
      filters: [{}],
      filteredValue: filteredInfo.Schedule_start || null,
      onFilter: (value, record) => record.Schedule_start.includes(value),
      sorter: (a, b) => {
        return a.Schedule_start > b.Schedule_start ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "Schedule_start" ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, { Schedule_start }) => {
        return <div></div>;
      },
    },
    {
      index: 2,
      title: "Schedule Duration",
      dataIndex: "Schedule_duration",
      key: "Schedule_duration",
      width: 100,
      filters: [
        {
          text: "Malesuada",
          value: "Malesuada",
        },
      ],
      filteredValue: filteredInfo.Schedule_duration || null,
      onFilter: (value, record) => record.Schedule_duration.includes(value),
      //   sorter is for sorting asc or dsc purActivitye
      sorter: (a, b) => {
        return a.Schedule_duration > b.Schedule_duration ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "Schedule_duration" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Therapist",
      key: "Therapist",
      dataIndex: "Therapist",
      width: 80,
      filters: [{}],
      filteredValue: filteredInfo.Therapist || null,
      onFilter: (value, record) => record.Therapist.includes(value),
      //   sorter is for sorting asc or dsc purActivitye
      sorter: (a, b) => {
        return a.Therapist > b.Therapist ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "Therapist" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Activity",
      key: "Activity",
      dataIndex: "Activity",
      width: 80,
      filters: [{}],
      filteredValue: filteredInfo.Activity || null,
      onFilter: (value, record) => record.Activity.includes(value),
      //   sorter is for sorting asc or dsc purActivitye
      sorter: (a, b) => {
        return a.Activity > b.Activity ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "Activity" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];
  return (
    <div>
      <Modal
        open={open}
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={1200}
        closable={false}
        className="box"
      >
        <div className="px-0 py-2 font-[poppins,sans-serif]">
          <div className="flex items-center justify-between">
            <h1 className="text-base text-left text-orange-400 ">
              Change linked appointment
            </h1>

            <div className="flex items-center gap-2">
              <IoCloseCircleOutline
                onClick={handleClose}
                className="text-gray-600 text-2xl hover:text-primary"
              />
            </div>
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <div className=" overflow-scroll py-3">
            <Table
              pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
              size="small"
              bordered
              className=" text-xs font-normal "
              columns={column}
              dataSource={[]}
              rowSelection={{
                ...rowSelection,
              }}
              scroll={{
                y: 700,
              }}
              onChange={handleChange}
            />
          </div>
          <div className=" flex items-end justify-end mt-2">
            <button className="dcm-button mr-2">DELETE</button>

            <button className="dcm-close-button" onClick={handleClose}>
              CLOSE
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LinkToAppointment;

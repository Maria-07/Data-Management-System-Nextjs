import { Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";

const RecurringSessionModal = ({ handleClose, open }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const [tableData, setTableData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  console.log(tableData, "tableData");

  //   fetch data
  useEffect(() => {
    fetch("../../../All_Fake_Api/Credential.json")
      .then((res) => res.json())
      .then((d) => {
        setTableData(d);
        // setLoading2(false);
      });
  }, []);

  const column = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 120,
      filters: [{}],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => {
        return a.name > b.name ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "Credential Type",
      key: "credential_type",
      dataIndex: "credential_type",
      width: 100,
      filters: [{}],
      filteredValue: filteredInfo.credential_type || null,
      onFilter: (value, record) => record.credential_type.includes(value),
      //   sorter is for sorting asc or dsc purcredential_type
      sorter: (a, b) => {
        return a.credential_type > b.credential_type ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "credential_type" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "Expired Date",
      key: "date_expire",
      dataIndex: "date_expire",
      width: 100,
      filters: [{}],
      filteredValue: filteredInfo.date_expire || null,
      onFilter: (value, record) => record.date_expire.includes(value),
      //   sorter is for sorting asc or dsc purcredential_type
      sorter: (a, b) => {
        return a.date_expire > b.date_expire ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "date_expire" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: 100,
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
            {/* {status === "Scheduled" && (
              <button className="bg-gray-500 text-white text-[10px] py-[2px]  rounded w-14">
                {status}
              </button>
            )} */}
            {/* {status === "Rendered" && ( */}
            <button className="bg-teal-700 text-white text-[10px] py-[2px]  rounded w-14">
              Rendered
            </button>
            {/* )} */}
            {/* {status === "Hold" && (
              <button className="bg-red-700 text-white text-[10px] py-[2px]  rounded w-14">
                {status}
              </button>
            )}
            {status === "No Show" && (
              <button className="bg-blue-700 text-white text-[10px] py-[2px]  rounded w-14">
                {status}
              </button>
            )}
            {status === "Cancelled by Client" && (
              <button className="bg-black text-white text-[10px] py-[2px]  rounded w-14">
                {status}
              </button>
            )}
            {status === "Cancelled by Provider" && (
              <button className="bg-yellow-700 text-white text-[10px] py-[2px]  rounded w-28">
                {status}
              </button>
            )} */}
          </div>
        );
      },
      filters: [
        {
          text: "hold",
          value: "hold",
        },
        {
          text: "Rendered",
          value: "Rendered",
        },
        {
          text: "Scheduled",
          value: "Scheduled",
        },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status.includes(value),
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  return (
    <div>
      <div>
        <Modal
          open={true} //aikhaney true na likey ekta state ana lagbey tar value 'true'
          centered
          width={600}
          footer={null}
          bodyStyle={{ padding: "0" }}
          closable={false}
          className="box rounded-xl"
          // onClose={handleClose}
          // aria-labelledby="responsive-dialog-title"
        >
          <div className="px-5 py-2">
            <div className="flex items-center justify-end">
              <IoCloseCircleOutline
                onClick={handleClose}
                className="text-gray-600 text-2xl hover:text-primary"
              />
            </div>

            <div className="bg-gray-200 py-[1px] mt-3"></div>

            <div className=" flex items-end justify-start gap-2 mt-2">
              <button className=" pms-button mr-2">
                This session will affect
              </button>
              <button className=" pms-button mr-2">Total 0</button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="overflow-scroll">
                  <Table
                    pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
                    size="small"
                    className=" text-xs font-normal mt-5"
                    columns={column}
                    bordered
                    rowKey={(record) => record.id} //record is kind of whole one data object and here we are
                    dataSource={tableData}
                    rowSelection={{
                      ...rowSelection,
                    }}
                    onChange={handleChange}
                  />
                </div>
              </div>{" "}
              <div className=" flex items-end justify-start gap-2 mt-2">
                <button className="pms-close-button" onClick={handleClose}>
                  This session will affect
                </button>
                <button className="pms-close-button" onClick={handleClose}>
                  Total 41
                </button>
              </div>
              <div className="overflow-scroll">
                <Table
                  pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
                  size="small"
                  className=" text-xs font-normal mt-5"
                  columns={column}
                  bordered
                  rowKey={(record) => record.id} //record is kind of whole one data object and here we are
                  dataSource={tableData}
                  onChange={handleChange}
                />
              </div>
              <div className="bg-gray-200 py-[1px] mt-3"></div>
              <div className=" flex items-end justify-end mt-2">
                <button className=" pms-button mr-2" type="submit">
                  Save
                </button>

                <button className="pms-close-button" onClick={handleClose}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default RecurringSessionModal;

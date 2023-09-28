import React, { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Table, Modal } from "antd";

const SelectContactRate = ({ handleClose, open }) => {
  const [tableData, settableData] = useState([
    {
      id: "35-522-2427",
      key: 1,
      service_type: "Berka",
      service_sub_type: "Piper",
      cpt: 14,
      M1: 54,
      M2: 19,
      M3: 35,
      M4: 55,
      Rate_Per: 77,
      Contacted_Rate: "2",
      Billing_Rate: 76,
    },
    {
      id: "94-716-1577",
      key: 2,
      service_type: "Philliskirk",
      service_sub_type: "Donovan",
      cpt: 17,
      M1: 88,
      M2: 31,
      M3: 41,
      M4: 66,
      Rate_Per: 89,
      Contacted_Rate: "41",
      Billing_Rate: 81,
    },
    {
      id: "46-295-2775",
      key: 3,
      service_type: "McGenn",
      service_sub_type: "Harwell",
      cpt: 16,
      M1: 59,
      M2: 25,
      M3: 61,
      M4: 23,
      Rate_Per: 65,
      Contacted_Rate: "55459",
      Billing_Rate: 25,
    },
    {
      id: "50-790-1664",
      key: 4,
      service_type: "Melvin",
      service_sub_type: "Marion",
      cpt: 39,
      M1: 55,
      M2: 83,
      M3: 47,
      M4: 54,
      Rate_Per: 93,
      Contacted_Rate: "62443",
      Billing_Rate: 20,
    },
    {
      id: "70-859-2627",
      key: 5,
      service_type: "Ruddom",
      service_sub_type: "Amery",
      cpt: 94,
      M1: 98,
      M2: 53,
      M3: 37,
      M4: 80,
      Rate_Per: 89,
      Contacted_Rate: "99",
      Billing_Rate: 7,
    },
    {
      id: "44-977-4356",
      key: 6,
      service_type: "Taveriner",
      service_sub_type: "Chandra",
      cpt: 38,
      M1: 29,
      M2: 59,
      M3: 91,
      M4: 80,
      Rate_Per: 33,
      Contacted_Rate: "708",
      Billing_Rate: 31,
    },
    {
      id: "42-436-2531",
      key: 7,
      service_type: "Bumford",
      service_sub_type: "Kelvin",
      cpt: 82,
      M1: 11,
      M2: 74,
      M3: 39,
      M4: 21,
      Rate_Per: 55,
      Contacted_Rate: "37075",
      Billing_Rate: 45,
    },
  ]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  console.log(tableData);
  console.log("table");

  const columns = [
    {
      title: "Service Type",
      dataIndex: "service_type",
      key: "service_type",
      width: 100,
      filters: [
        {
          text: "Berka",
          value: "Berka",
        },
      ],
      filteredValue: filteredInfo.service_type || null,
      onFilter: (value, record) => record.service_type.includes(value),
      sorter: (a, b) => {
        return a.service_type > b.service_type ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "service_type" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Service Sub Type",
      dataIndex: "service_sub_type",
      key: "service_sub_type",
      width: 120,
      filters: [
        {
          text: "Malesuada",
          value: "Malesuada",
        },
      ],
      filteredValue: filteredInfo.service_sub_type || null,
      onFilter: (value, record) => record.service_sub_type.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.service_sub_type > b.service_sub_type ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "service_sub_type" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "cpt",
      key: "cpt",
      dataIndex: "cpt",
      width: 50,
      filters: [{}],
      filteredValue: filteredInfo.cpt || null,
      onFilter: (value, record) => record.cpt.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.cpt > b.cpt ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "cpt" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "M1",
      key: "M1",
      dataIndex: "M1",
      width: 50,
      filters: [{}],
      filteredValue: filteredInfo.M1 || null,
      onFilter: (value, record) => record.M1.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.M1 > b.M1 ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "M1" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "M2",
      key: "M2",
      dataIndex: "M2",
      width: 50,
      filters: [{}],
      filteredValue: filteredInfo.M2 || null,
      onFilter: (value, record) => record.M2.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.M2 > b.M2 ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "M2" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "M3",
      key: "M3",
      dataIndex: "M3",
      width: 50,
      filters: [{}],
      filteredValue: filteredInfo.M3 || null,
      onFilter: (value, record) => record.M3.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.M3 > b.M3 ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "M3" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "M4",
      key: "M4",
      dataIndex: "M4",
      width: 50,
      filters: [{}],
      filteredValue: filteredInfo.M4 || null,
      onFilter: (value, record) => record.M4.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.M4 > b.M4 ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "M4" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Rate_Per",
      key: "Rate_Per",
      dataIndex: "Rate_Per",
      width: 70,
      filters: [{}],
      filteredValue: filteredInfo.Rate_Per || null,
      onFilter: (value, record) => record.Rate_Per.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.Rate_Per > b.Rate_Per ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "Rate_Per" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Contacted_Rate",
      key: "Contacted_Rate",
      dataIndex: "Contacted_Rate",
      width: 70,
      filters: [{}],
      filteredValue: filteredInfo.Contacted_Rate || null,
      onFilter: (value, record) => record.Contacted_Rate.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.Contacted_Rate > b.Contacted_Rate ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "Contacted_Rate" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Billing_Rate",
      key: "Billing_Rate",
      dataIndex: "Billing_Rate",
      width: 70,
      filters: [{}],
      filteredValue: filteredInfo.Billing_Rate || null,
      onFilter: (value, record) => record.Billing_Rate.includes(value),
      //   sorter is for sorting asc or dsc purcpte
      sorter: (a, b) => {
        return a.Billing_Rate > b.Billing_Rate ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "Billing_Rate" ? sortedInfo.order : null,
      ellipsis: true,
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

  const clearFilters = () => {
    setFilteredInfo({});
  };

  return (
    <div>
      <Modal
        open={open}
        centered
        width={1400}
        footer={false}
        closable={false}
        bodyStyle={{ padding: "0" }}
        className="box rounded-md"
      >
        <div className="px-5">
          <div className="flex items-center justify-between">
            <h1 className="text-lg text-left text-orange-400 ">
              Edit Document
            </h1>
            <IoCloseCircleOutline
              onClick={handleClose}
              className="text-gray-600 font-semibold  text-2xl hover:text-primary "
            />
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <div className="flex items-end justify-end my-2">
            <button
              onClick={clearFilters}
              className="px-2  py-2 bg-white from-primary text-xs  hover:to-secondary text-secondary border border-secondary rounded-sm"
            >
              Clear filters
            </button>
          </div>

          <div className="overflow-scroll">
            <Table
              bordered
              rowKey="id"
              pagination={false}
              size="small"
              className="table-striped-rows text-xs font-normal"
              columns={columns}
              dataSource={tableData}
              onChange={handleChange}
              rowSelection={{
                ...rowSelection,
              }}
            />
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>

          <div className="flex gap-3 items-end justify-end mb-2 mt-4">
            <button type="submit" className="dcm-modal-submit-button">
              Save
            </button>
            <button onClick={handleClose} className="dcm-modal-close-button">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SelectContactRate;

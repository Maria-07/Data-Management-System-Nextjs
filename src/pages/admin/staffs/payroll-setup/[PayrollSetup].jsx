import { getAccessToken } from "@/Redux/api/apiSlice";
import {
  useBulkDeletePayrollMutation,
  useBulkUpdatePayrollMutation,
  useDeletePayrollMutation,
  useGetPayrollsQuery,
} from "@/Redux/features/staff/payroleSetup/payrollSetupApi";
import RootLayout from "@/component/Layouts/RootLayout";
import StaffLayout from "@/component/Layouts/StaffLayout";
import TableShimmer from "@/component/UI/Layouts/Shimmer/TableShimmer";
import PayrollEditModal from "@/component/UI/Staff/Payroll/PayrollSetup/PayrollEditModal";
import PayrollSetupModal from "@/component/UI/Staff/Payroll/PayrollSetup/PayrollSetupModal";
import { Table } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

const PayrollSetup = () => {
  //! Id get
  const router = useRouter();
  const { query } = router;
  const id = query.payrollSetup;
  console.log(id);
  const token = getAccessToken();

  const [select, setSelect] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [page, setPage] = useState(1);
  const [payrollId, setPayRollId] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [hourlyRate, setHourlyRate] = useState(null);
  const [milageRate, setMilageRate] = useState(null);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  //! Get Payroll api
  const {
    data: payrollData,
    isLoading,
    isError,
  } = useGetPayrollsQuery({
    token,
    id,
    page,
  });

  //! Delete payroll api
  const [deletePayroll, { isSuccess: deleteSuccess, isError: deleteError }] =
    useDeletePayrollMutation();

  //! Bulk-Delete payroll api
  const [
    bulkDeletePayroll,
    { isSuccess: bulkDeleteSuccess, isError: bulkDeleteError },
  ] = useBulkDeletePayrollMutation();

  //! Bulk update payroll api
  const [bulkUpdatePayroll, { isSuccess: bulkUpdateSuccess }] =
    useBulkUpdatePayrollMutation();

  const { services } = payrollData || [];
  console.log("All services", services);
  const totalPage = payrollData?.payrolls?.lastPage;

  //handle pagination function
  const handlePageClick = ({ selected: selectedPage }) => {
    console.log("selected page", selectedPage);
    setPage(selectedPage + 1);
  };

  //Edit Modal
  const handleEditModal = (id) => {
    setPayRollId(id);
    setEditModal(true);
  };
  //add Modal
  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    setEditModal(false);
  };

  //delete payroll handler(id wise)
  const deletePayrollHandler = (record) => {
    console.log("delete record to be ", record);
    if (record?.id) {
      deletePayroll({
        token,
        payload: {
          id: record?.id,
        },
      });
    }
  };
  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Successfully Payroll Deleted", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
      handleClose();
    } else if (deleteError) {
      toast.error("Some Error Occured", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [deleteSuccess, deleteError]);

  const handleBulkDelete = () => {
    if (
      select === "1" &&
      hourlyRate !== null &&
      milageRate !== null &&
      selectedRowKeys.length > 0
    ) {
      console.log(
        "from bulk delete hourlyRate, milageRate",
        hourlyRate,
        milageRate
      );
      const payload = {
        hourly_rate: hourlyRate,
        milage_rate: milageRate,
        edit_ids: selectedRowKeys,
        check: 1,
      };
      bulkUpdatePayroll({
        token,
        payload,
      });
    } else if (
      select === "2" &&
      hourlyRate !== null &&
      selectedRowKeys.length > 0
    ) {
      console.log("from bulk delete hourlyRate", hourlyRate);
      const payload = {
        hourly_rate: hourlyRate,
        edit_ids: selectedRowKeys,
        check: 2,
      };
      bulkUpdatePayroll({
        token,
        payload,
      });
    } else if (
      select === "3" &&
      milageRate !== null &&
      selectedRowKeys.length > 0
    ) {
      console.log("from bulk delete milageRate", milageRate);
      const payload = {
        milage_rate: milageRate,
        edit_ids: selectedRowKeys,
        check: 3,
      };
      bulkUpdatePayroll({
        token,
        payload,
      });
    } else {
      toast.error("Please Select Valid Option", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };

  const column = [
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      width: 120,
      render: (_, record) => {
        let ser = payrollData?.services?.find(
          (s) => parseInt(s?.id) === parseInt(record?.service_id)
        );
        return (
          <h1>{`${ser?.service} (${ser?.service_treatment?.treatment_name})`}</h1>
        );
      },
      sorter: (a, b) => {
        return a.service > b.service ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "service" ? sortedInfo.order : null,
      ellipsis: false,
    },

    {
      title: "Hourly Rate",
      key: "hourly_rate",
      dataIndex: "hourly_rate",
      width: 100,
      render: (_, record) => {
        return <h1>{record?.hourly_rate}/hr</h1>;
      },
      //   sorter is for sorting asc or dsc purhourly_rate
      sorter: (a, b) => {
        return a.hourly_rate > b.hourly_rate ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "hourly_rate" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "Milage Rate",
      key: "milage_rate",
      dataIndex: "milage_rate",
      width: 100,
      render: (_, record) => {
        return <h1>{record?.milage_rate} cents/miles</h1>;
      },
      //   sorter is for sorting asc or dsc purhourly_rate
      sorter: (a, b) => {
        return a.milage_rate > b.milage_rate ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "milage_rate" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "billable",
      key: "billable",
      dataIndex: "billable",
      width: 100,
      //   sorter is for sorting asc or dsc purhourly_rate
      sorter: (a, b) => {
        return a.billable > b.billable ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "billable" ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, { id, billable }) => {
        return <div>{billable ? "Yes" : "No"}</div>;
      },
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      width: 150,
      render: (_, record) => (
        <div className="flex justify-center gap-1 text-primary">
          <FiEdit
            onClick={() => handleEditModal(record)}
            className="text-xs mx-2  text-lime-700"
            title="Edit"
          />

          <span>|</span>

          <AiOutlineDelete
            onClick={() => deletePayrollHandler(record)}
            className="text-xs text-red-500 mx-2"
            title="Delete"
          />
        </div>
      ),
    },
  ];

  //get rows id to do some action on them
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selected row-keys: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  console.log(selectedRowKeys);

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  useEffect(() => {
    if (bulkUpdateSuccess) {
      toast.success("successfully updated selected payrolls", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
      setSelectedRowKeys([]);
      handleClose();
    }
  }, [bulkUpdateSuccess]);
  const clearFilters = () => {
    setFilteredInfo({});
  };

  return (
    <div>
      {" "}
      <div className="">
        <div className="flex flex-wrap items-center justify-between gap-2 my-2">
          <h1 className="text-lg text-orange-500 text-left font-semibold ">
            Payroll Setup
          </h1>

          <div className="flex items-center gap-2">
            <button onClick={clearFilters} className="dcm-clear-button border">
              Clear filters
            </button>
            <button
              onClick={handleClickOpen}
              className="dtm-button"
              type="submit"
            >
              + Add Payroll
            </button>
          </div>
        </div>

        <div className=" overflow-scroll">
          {!isLoading ? (
            <Table
              pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
              size="small"
              className="table-striped-rows text-xs font-normal mt-5"
              columns={column}
              bordered
              rowKey={(record) => record.id} //record is kind of whole one data object and here we are
              dataSource={payrollData?.payrolls?.data}
              onChange={handleChange}
              // rowSelection={{
              //   ...rowSelection,
              // }}
              rowSelection={rowSelection}
            />
          ) : (
            <TableShimmer></TableShimmer>
          )}
        </div>
        {totalPage > 0 && (
          <div className="flex flex-row-reverse justify-between">
            <div className="flex items-center justify-start">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                // previousLabel={"🡰"}
                // nextLabel={"🡲"}
                pageCount={Number(totalPage)}
                marginPagesDisplayed={1}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination_Link"}
                nextLinkClassName={"pagination_Link"}
                activeClassName={"pagination_Link-active"}
                disabledClassName={"pagination_Link-disabled"}
              ></ReactPaginate>
            </div>
          </div>
        )}
        <div className="flex my-5">
          <select
            onChange={(e) => setSelect(e.target.value)}
            className=" bg-transparent border-b-[2px] border-secondary  rounded-sm px-[2px] py-[3px] mx-1 text-[14px]  focus:outline-none z-0 font-bold"
          >
            <option value="select" className="text-black"></option>
            <option value={1} className="text-black">
              Update Hourly and Mileage Rate
            </option>
            <option value={2} className="text-black">
              Update Hourly Rate
            </option>
            <option value={3} className="text-black">
              Update Milage Rate
            </option>
            <option value="Bulk Delete" className="text-black">
              Bulk Delete
            </option>
          </select>
          {select === "1" && (
            <div className="flex gap-2">
              <input
                onChange={(e) => setHourlyRate(e.target.value)}
                className="ml-4 bg-transparent border-b-[2px] border-secondary  rounded-sm px-[2px] py-[3px] mx-1 text-[14px]  focus:outline-none z-0 font-bold"
                defaultValue={hourlyRate}
                type="text"
                placeholder="Hourly Rate"
              />
              <input
                onChange={(e) => setMilageRate(e.target.value)}
                className="ml-4 bg-transparent border-b-[2px] border-secondary  rounded-sm px-[2px] py-[3px] mx-1 text-[14px]  focus:outline-none z-0 font-bold"
                type="text"
                defaultValue={milageRate}
                placeholder="Milage Rate"
              />
            </div>
          )}
          {select === "2" && (
            <input
              onChange={(e) => setHourlyRate(e.target.value)}
              className="ml-4 bg-transparent border-b-[2px] border-secondary  rounded-sm px-[2px] py-[3px] mx-1 text-[14px]  focus:outline-none z-0 font-bold"
              type="text"
              defaultValue={hourlyRate}
              placeholder="Hourly Rate"
            />
          )}
          {select === "3" && (
            <input
              onChange={(e) => setMilageRate(e.target.value)}
              className="ml-4 bg-transparent border-b-[2px] border-secondary  rounded-sm px-[2px] py-[3px] mx-1 text-[14px]  focus:outline-none z-0 font-bold"
              type="text"
              defaultValue={milageRate}
              placeholder="Milage Rate"
            />
          )}
          <button onClick={handleBulkDelete} className="dcm-input-button">
            Update
          </button>
        </div>

        {openModal && (
          <PayrollSetupModal
            handleClose={handleClose}
            open={openModal}
            services={services}
            token={token}
            id={id}
          ></PayrollSetupModal>
        )}
        {editModal && (
          <PayrollEditModal
            payroll={payrollId}
            services={services}
            handleClose={handleClose}
            open={editModal}
            token={token}
            id={id}
          ></PayrollEditModal>
        )}
      </div>
    </div>
  );
};

export default PayrollSetup;

PayrollSetup.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <StaffLayout>{page}</StaffLayout>
    </RootLayout>
  );
};

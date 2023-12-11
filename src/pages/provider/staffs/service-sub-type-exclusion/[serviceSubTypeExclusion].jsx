import { getAccessToken } from "@/Redux/api/apiSlice";
import {
  useAddServiceSubtypeMutation,
  useDeleteServiceSubtypeMutation,
  useGetAllSubActivityQuery,
  useGetAssignedSubtypeQuery,
} from "@/Redux/features/staff/staffSubtype_Exclusion/staffSubtypeExclusionApi";
import RootLayout from "@/component/Layouts/RootLayout";
import StaffLayout from "@/component/Layouts/StaffLayout";
import Loading from "@/component/UI/Layouts/Loading";
import { Table } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { GoAlert } from "react-icons/go";
import { toast } from "react-toastify";

const ServiceSubTypeExclusion = () => {
  //! Id get
  const router = useRouter();
  const { query } = router;
  const id = query.serviceSubTypeExclusion;
  const token = getAccessToken();

  const [sortedInfo, setSortedInfo] = useState({});
  const [targettedData, setTargettedData] = useState([]);

  //staff all sub-activity get api
  const {
    data: allSubActivity,
    isLoading: subActivityLoading,
    isSuccess: subActivitySuccess,
  } = useGetAllSubActivityQuery({
    token,
    payload: {
      employee_id: id,
    },
  });

  //staff assigned sub-activity get api
  const {
    data: assignedActivity,
    isLoading: assignedActivityLoading,
    isError: assignedActivityError,
  } = useGetAssignedSubtypeQuery({
    token,
    payload: {
      employee_id: id,
    },
  });

  //add staff service sub-type api
  const [addServiceSubtype, { isSuccess: addSuccess, isError: addError }] =
    useAddServiceSubtypeMutation();

  //delete satff service sub-type api
  const [
    deleteServiceSubtype,
    { isSuccess: deleteSuccess, isError: deleteError },
  ] = useDeleteServiceSubtypeMutation();

  const subActivityData = allSubActivity?.allSubtype || [];
  const assignedSubactivityData = assignedActivity?.allAssignedSubtype || [];
  console.log(assignedSubactivityData);

  //Handle selected ids
  const handleAdding = (e) => {
    let value = Array.from(
      e.target.selectedOptions,
      (option) => option.value * 1
    );
    // console.log( value);
    setTargettedData(value);
  };
  console.log("selected values", targettedData);

  // handle add service subtype
  const handleExcluded = () => {
    const payload = {
      sub_activity_id: targettedData,
      employee_id: id,
    };
    addServiceSubtype({
      token,
      payload,
    });
    setTargettedData([]);
  };
  //handle delete service sub-type
  // delete
  const handleDelete = (deletedid) => {
    const payload = {
      del_id: deletedid,
      employee_id: id,
    };
    deleteServiceSubtype({
      token,
      payload,
    });
  };

  //To show Toast
  useEffect(() => {
    if (addSuccess) {
      toast.success("successfully assigned to the exclusion", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else if (addError) {
      toast.error("Some Error Occured", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [addSuccess, addError]);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("successfully removed from assigned", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    } else if (deleteError) {
      toast.error("Some Error Occured", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        style: { fontSize: "12px" },
      });
    }
  }, [deleteError, deleteSuccess]);

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setSortedInfo(sorter);
  };

  if (subActivityLoading) {
    return <Loading></Loading>;
  }

  const column = [
    {
      title: "Service Sub-Type",
      dataIndex: "sub_activity_name",
      key: "sub_activity_name",
      width: 120,
      render: (_, { subactivity }) => {
        return <h1 className="text-center">{subactivity?.sub_activity}</h1>;
      },
      sorter: (a, b) => {
        return a.sub_activity_name > b.sub_activity_name ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "sub_activity_name" ? sortedInfo.order : null,
      ellipsis: false,
    },
    {
      title: "Actions",
      key: "id",
      dataIndex: "id",
      width: 100,
      render: (_, { id, File_name }) => {
        return (
          <div className="mx-auto flex items-center justify-center font-bold">
            <button onClick={() => handleDelete(id)} className=" text-red-500">
              <AiOutlineDelete />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {" "}
      <div className="h-[100vh]">
        <h1 className="text-lg text-orange-500 text-left font-semibold ">
          Service Sub-Type Exclusion
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 my-2 gap-x-2  gap-y-1">
          {/* <div className="flex flex-wrap gap-y-1"> */}
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">
              Insurance
            </label>
            <select
              multiple={true}
              onChange={(e) => {
                handleAdding(e);
              }}
              className="text-black border h-48 border-gray-300  rounded-sm focus:focus:ring-[#02818F] focus:border-[#0AA7B8] block w-full py-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-[#02818F] dark:focus:[#02818F]"
            >
              {subActivityData.length > 0 &&
                subActivityData?.map((item, index) => (
                  <option
                    key={item.id}
                    className="px-2 text-sm"
                    value={item.id}
                  >
                    {item.sub_activity}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handleExcluded}
              disabled={targettedData.length === 0}
              className="dcm-button my-2"
              type="submit"
            >
              Exclude Selected Service Sub-Type
            </button>
          </div>
          <div>
            {/* {selectedKeys ? ( */}
            <div className="overflow-scroll">
              <Table
                pagination={false}
                size="small"
                className=" text-xs font-normal mt-5"
                columns={column}
                bordered
                rowKey={(record) => record.id}
                dataSource={assignedSubactivityData}
                onChange={handleChange}
                scroll={{
                  y: 200,
                }}
              />
            </div>
            <>
              {assignedSubactivityData < 0 && (
                <div className="text-red-500 red-box border border-gray-300 rounded-sm px-3 font-medium py-[10px]  text-xs w-full flex justify-between items-center gap-2">
                  <span className="flex items-center gap-2">
                    <GoAlert className="text-red-500" /> No Current Association
                  </span>
                  <span>{/* <FcCancel /> */}</span>
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSubTypeExclusion;

ServiceSubTypeExclusion.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <StaffLayout>{page}</StaffLayout>
    </RootLayout>
  );
};

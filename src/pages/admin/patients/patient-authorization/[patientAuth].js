/* eslint-disable react-hooks/rules-of-hooks */
import { getAccessToken } from "@/Redux/api/apiSlice";
import {
  useGetPatientAuthorizationQuery,
  usePatientAuthorizationDeleteMutation,
} from "@/Redux/features/patient/authorization/authorizationApi";
import PatientLayout from "@/component/Layouts/PatientLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import Loading from "@/component/UI/Layouts/Loading";
import AuthorizationActivityTable from "@/component/UI/Patients/Patients/Authorization/AuthorizationActivityTable/AuthorizationActivityTable";
import AuthorizationEditModal from "@/component/UI/Patients/Patients/Authorization/AuthorizationEdit/AuthorizationEditModal";
import SelectContactRate from "@/component/UI/Patients/Patients/Authorization/SelectContactRate";
import { Table } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { BiCopy, BiSolidCircle } from "react-icons/bi";

const PatientAuth = () => {
  //! Id get
  const router = useRouter();
  const { query } = router;
  const id = query.patientAuth;
  // console.log(id);
  const token = getAccessToken();

  //! get patient authorization api
  const { data: authorizationData, isLoading: authorizationloading } =
    useGetPatientAuthorizationQuery({
      token,
      payload: {
        client_id: id,
      },
    });

  const clientAuthorizationData = authorizationData?.allAuthorization || [];
  const clientSelectedPayors = authorizationData?.selectedPayors || [];

  // console.log("Patient Auth = ", clientAuthorizationData);
  // console.log("Patient clientSelectedPayors = ", clientSelectedPayors);

  const editAuth = (record) => {
    //console.log("editdata edit", record);
    router.push(`/admin/patients/authorization-edit/${record?.id}`);
    // navigate();
  };

  const [
    patientAuthorizationDelete,
    { isSuccess: deleteSuccess, isError: deleteError },
  ] = usePatientAuthorizationDeleteMutation();

  const handleDelete = (record) => {
    // console.log("delete record", record?.id);
    if (record?.id) {
      const res = patientAuthorizationDelete({
        token,
        payload: {
          id: record?.id,
        },
      });

      // console.log("res delete", res);
    }
  };

  //! table info

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [selectContact, setSelectContact] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  //row expand code related
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  //! expendable row ar data jeita expand korley show korbey tar jnno new component call and props hisabey each row ar record id send
  const expandedRowRender = (record) => {
    // console.log("record", record);
    return (
      <div className="ml-[-40px] my-2">
        <AuthorizationActivityTable id={record?.id} />
      </div>
    );
  };

  //! If one new row is expanded then row expendation will be hidden
  const onTableRowExpand = (expanded, record) => {
    const keys = [];
    if (expanded) {
      keys.push(record.id); // I have set my record.id as row key. Check the documentation for more details.
    }
    setExpandedRowKeys(keys);
  };

  const handleClose = () => {
    setOpenEditModal(false);
    setSelectContact(false);
  };

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 120,
      sorter: (a, b) => {
        return a.description > b.description ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "description" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Onset Date",
      dataIndex: "onset_date",
      key: "onset_date",
      width: 130,
      //   sorter is for sorting asc or dsc purstatuse
      sorter: (a, b) => {
        return a.onset_date > b.onset_date ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "onset_date" ? sortedInfo.order : null,
      ellipsis: false,
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      width: 100,
      //   sorter is for sorting asc or dsc purstatuse
      sorter: (a, b) => {
        return a.end_date > b.end_date ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "end_date" ? sortedInfo.order : null,
      ellipsis: false,
    },
    {
      title: "Insurance",
      dataIndex: "insurance",
      key: "insurance",
      width: 150,
      render: (_, record) => {
        return (
          <h1>
            {
              clientSelectedPayors?.find(
                (payor) => payor?.payor_id === record?.payor_id
              )?.payor_name
            }
          </h1>
        );
      },
      //   sorter is for sorting asc or dsc purstatuse
      sorter: (a, b) => {
        return a.insurance > b.insurance ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "insurance" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Ins. ID",
      dataIndex: "uci_id",
      key: "uci_id",
      width: 150,
      //   sorter is for sorting asc or dsc purstatuse
      sorter: (a, b) => {
        return a.uci_id > b.uci_id ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "uci_id" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Auth No.",
      dataIndex: "authorization_number",
      key: "authorization_number",
      width: 150,
      //   sorter is for sorting asc or dsc purstatuse
      sorter: (a, b) => {
        return a.authorization_number > b.authorization_number ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "authorization_number"
          ? sortedInfo.order
          : null,
      ellipsis: true,
    },
    {
      title: "COB",
      dataIndex: "is_primary",
      key: "is_primary",
      width: 100,
      render: (_, { is_primary }) => {
        if (is_primary === 1) {
          return <h1 className="text-green-600">Primary</h1>;
        } else if (is_primary === 2) {
          return <h1 className="text-red-600">Secondary</h1>;
        } else if (is_primary === 3) {
          return <h1>Tertiary</h1>;
        }
      },
      //   sorter is for sorting asc or dsc purstatuse
      sorter: (a, b) => {
        return a.is_primary > b.is_primary ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder:
        sortedInfo.columnKey === "is_primary" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      width: 150,
      render: (_, record) => {
        return (
          <div>
            <div className="flex justify-center gap-1 text-primary">
              <button
                onClick={() => {
                  setSelectContact(true);
                }}
              >
                <BiCopy className="text-xs mx-2 " />
              </button>

              <span>|</span>
              <button
                onClick={() => {
                  setOpenEditModal(true);
                }}
              >
                <AiOutlinePlus className="text-xs mx-2 " />
              </button>
              {/* edit */}
              <span>|</span>
              <button onClick={() => editAuth(record)}>
                <AiOutlineEdit
                  className="text-xs mx-2  text-lime-700"
                  title="Edit"
                />
              </button>

              <span>|</span>
              <button>
                <AiFillDelete
                  onClick={() => handleDelete(record)}
                  className="text-sm mt-[3px] text-red-500 mx-2"
                  title="Delete"
                />
              </button>
            </div>
          </div>
        );
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: 100,
      render: (_, { status }) => {
        return (
          <>
            {status === true ? (
              <div className="flex items-center justify-center gap-2 ">
                <BiSolidCircle className="text-green-500" />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 ">
                <BiSolidCircle className="text-red-500" />
              </div>
            )}
          </>
        );
      },
      //   sorter is for sorting asc or dsc purstatuse
      sorter: (a, b) => {
        return a.status > b.status ? -1 : 1; //sorting problem solved using this logic
      },
      sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];
  return (
    <div>
      {" "}
      <div className="h-[100vh]">
        <div className="h-[100%]">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
            <h1 className="text-[14px] font-semibold">Authorization</h1>
            <div className="flex items-center gap-2 flex-wrap">
              <button onClick={clearFilters} className="dcm-clear-button">
                Clear filters
              </button>
              <Link href={"/admin/patients/patient-authorization/add-auth"}>
                <button className="dtm-button">+ Add Authorization</button>
              </Link>
            </div>
          </div>

          <div className=" overflow-scroll ">
            {!authorizationloading ? (
              <Table
                bordered
                pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
                rowKey={(record) => record.id} //record is kind of whole one data object and here we are
                size="small"
                className=" text-xs font-normal table-striped-rows"
                columns={columns}
                dataSource={clientAuthorizationData}
                expandable={{
                  expandedRowRender,
                }}
                scroll={{
                  y: 850,
                }}
                expandedRowKeys={expandedRowKeys}
                onExpand={onTableRowExpand}
                onChange={handleChange}
              />
            ) : (
              <Loading />
            )}
          </div>
        </div>

        {selectContact && (
          <SelectContactRate
            handleClose={handleClose}
            open={selectContact}
            // editableRow={editableRow}
          ></SelectContactRate>
        )}

        {openEditModal && (
          <AuthorizationEditModal
            handleClose={handleClose}
            open={openEditModal}
            authorizationId={id}
            // editableRow={editableRow}
          ></AuthorizationEditModal>
        )}
      </div>
    </div>
  );
};

export default PatientAuth;

PatientAuth.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <PatientLayout>{page}</PatientLayout>
    </RootLayout>
  );
};

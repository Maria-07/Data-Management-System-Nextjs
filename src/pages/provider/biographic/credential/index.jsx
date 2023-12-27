import { getAccessToken } from "@/Redux/api/apiSlice";
import { useGetClearenceQuery } from "@/Redux/features/staff/credentials/clearenceApi";
import { useGetCredentialsQuery } from "@/Redux/features/staff/credentials/credentialsApi";
import { useGetQualificationQuery } from "@/Redux/features/staff/credentials/qualificationApi";
import BiographyLayout from "@/component/Layouts/BiographyLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import StaffLayout from "@/component/Layouts/StaffLayout";
import Loading from "@/component/UI/Layouts/Loading";
import Clearance from "@/component/UI/Staff/Credentials/Clearance/Clearance";
import Credential from "@/component/UI/Staff/Credentials/Credential/Credential";
import Qualification from "@/component/UI/Staff/Credentials/Qualification/Qualification";
import { Collapse } from "antd";
import { useRouter } from "next/router";

const CredentialPage = () => {
  //! Id get
  const router = useRouter();
  const { query } = router;
  // const id = query.credential;
  // console.log(id);
  const token = getAccessToken();
  //! get all clearence data api
  const { data: clearences, isLoading: clearenceLoading } =
    useGetClearenceQuery({
      token,
      page: 1,
      id: 1,
    });

  //! get all credential data api
  const { data: credentials, isLoading: credentialsLoading } =
    useGetCredentialsQuery({
      token,
      page: 1,
      // id: id,
    });

  //! get all Qualification data api
  const { data: qualification, isLoading: qualificationLoading } =
    useGetQualificationQuery({
      token,
      page: 1,
      // id: id,
    });

  console.log("data -> 👉", credentials?.credentialsList);

  if (credentialsLoading || clearenceLoading || qualificationLoading) {
    return <Loading></Loading>;
  }

  const items = [
    {
      key: "1",
      label: (
        <h1 className="bg-primary ml-1 px-2 py-[5px] text-white rounded-t-sm">
          Clearance
        </h1>
      ),
      children: (
        <div className="border-x-[1px] px-4 mt-[-30px] py-7 border-b-[1px] rounded-b-md">
          <Clearance token={token} clearences={clearences}></Clearance>
        </div>
      ),
      showArrow: false,
    },
    {
      key: "2",
      label: (
        <h1 className="bg-primary ml-1 px-2 py-[5px] text-white rounded-t-sm">
          Credentials
        </h1>
      ),
      children: (
        <div className="border-x-[1px] px-4 mt-[-30px] py-7 border-b-[1px] rounded-b-md">
          <Credential token={token} credentials={credentials}></Credential>
        </div>
      ),
      showArrow: false,
    },
    {
      key: "3",
      label: (
        <h1 className="bg-primary ml-1 px-2 py-[5px] text-white rounded-t-sm">
          Qualification
        </h1>
      ),
      children: (
        <div className="border-x-[1px] px-4 mt-[-30px] py-7 border-b-[1px] rounded-b-md">
          <Qualification
            token={token}
            qualification={qualification}
          ></Qualification>
        </div>
      ),
      showArrow: false,
    },
  ];

  return (
    <div>
      {" "}
      <div>
        <Collapse
          accordion
          size="small"
          ghost
          defaultActiveKey={["1"]}
          items={items}
        />
      </div>
    </div>
  );
};

export default CredentialPage;

CredentialPage.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <BiographyLayout>{page}</BiographyLayout>
    </RootLayout>
  );
};

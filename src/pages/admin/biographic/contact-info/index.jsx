import { getAccessToken } from "@/Redux/api/apiSlice";
import { useStaffContactInfoQuery } from "@/Redux/features/staff/contactInfo/contactInfoApi";
import BiographyLayout from "@/component/Layouts/BiographyLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import ContactDetails from "@/component/UI/Staff/ContactInfo/ContactDetails";
import EmergencyContactDetails from "@/component/UI/Staff/ContactInfo/EmergencyContactDetails";
import { Collapse } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

const ContactInfo = () => {
  //! Id get
  const router = useRouter();
  const { query } = router;
  // const id = query.contactInfo;
  // console.log(id);
  const token = getAccessToken();
  const [emergency, setEmergency] = useState(false);

  const { data: contactData, isSuccess: contactDetailsSucess } =
    useStaffContactInfoQuery({ token });
  // console.log("contactData", contactData);

  const items = [
    {
      key: "1",
      label: (
        <h1 className="bg-secondary ml-1 px-2 py-[5px] text-white rounded-t-sm">
          Contact Details
        </h1>
      ),
      children: (
        <div className="border-x-[1px] px-4 mt-[-30px] py-7 border-b-[1px] rounded-b-md">
          <ContactDetails
            token={token}
            contactApiData={contactData?.contact_details}
          ></ContactDetails>
        </div>
      ),
      showArrow: false,
    },
    {
      key: "2",
      label: (
        <h1 className="bg-secondary ml-1 px-2 py-[5px] text-white rounded-t-sm">
          Emergency Contact Details
        </h1>
      ),
      children: (
        <div className="border-x-[1px] px-4 mt-[-30px] py-7 border-b-[1px] rounded-b-md">
          <EmergencyContactDetails
            token={token}
            emergencyApiData={contactData?.emergency_contact_details}
          ></EmergencyContactDetails>
        </div>
      ),
      showArrow: false,
    },
  ];
  return (
    <div>
      <Collapse
        accordion
        size="small"
        ghost
        defaultActiveKey={["1"]}
        items={items}
      />
    </div>
  );
};

export default ContactInfo;

ContactInfo.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <BiographyLayout>{page}</BiographyLayout>
    </RootLayout>
  );
};

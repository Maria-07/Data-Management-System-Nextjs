import RootLayout from "@/component/Layouts/RootLayout";

const appointmentPage = () => {
  return <div>Still Developing</div>;
};

export default appointmentPage;

appointmentPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

import RootLayout from "@/component/Layouts/RootLayout";

const reportPage = () => {
  return <div>Still Developing</div>;
};

export default reportPage;

reportPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

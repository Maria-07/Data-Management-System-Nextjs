import RootLayout from "@/component/Layouts/RootLayout";

const dashboardPage = () => {
  return (
    <div className="bg-white rounded-3xl text-red-700 my-2 p-2">
      This is dasboard part
    </div>
  );
};

export default dashboardPage;

dashboardPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

import RootLayout from "@/component/Layouts/RootLayout";
import TableShimmer from "@/component/UI/Layouts/Shimmer/TableShimmer";

const reportPage = () => {
  return (
    <div>
      Still Developing
      <TableShimmer></TableShimmer>
    </div>
  );
};

export default reportPage;

reportPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

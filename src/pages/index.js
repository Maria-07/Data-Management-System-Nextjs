import RootLayout from "@/component/Layouts/RootLayout";
import LogInForm from "@/component/UI/Auth/Login/LogInForm";
import ParticlesBg from "@/component/UI/Auth/ParticlesBg";

const LibraryPage = () => {
  return (
    <div
      className={`flex items-center justify-center py-[10%] text-xl login-bg min-h-[100vh]`}
    >
      <h1>
        <LogInForm></LogInForm>
      </h1>
      <ParticlesBg></ParticlesBg>
    </div>
  );
};

// LibraryPage.getLayout = function getLayout(page) {
//   return <RootLayout>{page}</RootLayout>;
// };

export default LibraryPage;

import RootLayout from "@/component/Layouts/RootLayout";
import LogInForm from "@/component/UI/Auth/Login/LogInForm";
import ParticlesBg from "@/component/UI/Auth/ParticlesBg";
import { NextSeo } from "next-seo";

const LibraryPage = () => {
  const canonicalUrl = "https://therapypms.com/sdfgdfhfdgh";
  return (
    <div
      className={`flex items-center justify-center py-[10%] text-xl login-bg min-h-[100vh]`}
    >
      <NextSeo
        canonical={canonicalUrl}
        // Other SEO-related properties like title, description, etc.
      />
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

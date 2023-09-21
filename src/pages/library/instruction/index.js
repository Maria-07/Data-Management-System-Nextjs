/* eslint-disable react-hooks/rules-of-hooks */
import LibraryLayout from "@/component/Layouts/LibraryLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import { Editor } from "@tinymce/tinymce-react";
import { Select } from "antd";
import { useTheme } from "next-themes";
import { useState } from "react";
import { BiVideo } from "react-icons/bi";

const instructionPage = () => {
  //! Theme system
  const { theme } = useTheme();

  //! Input editor
  const [content, setContent] = useState(""); // State to hold the content
  const handleEditorChange = (content, editor) => {
    setContent(content); // Update the state with the new content
    console.log(content); // Log the content to the console
  };

  //! selection tags
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
  };

  return (
    <div className="m-5">
      <div
        className={`${
          theme === "dark" ? "bg-dark-primary border-none" : "bg-white"
        }  min-h-[80vh] lg:p-5 p-2 w-full border rounded-lg shadow-md`}
      >
        {" "}
        <div className="">
          <div className="flex items-center justify-end flex-wrap gap-3">
            <button className="bg-primary text-sm  w-[265px] transition-all hover:bg-secondary flex items-center gap-2 text-white px-3 py-1 rounded-md shadow-md">
              <BiVideo className="text-xl" /> UPLOAD INSTRUCTION VIDEO
            </button>
            <button className="bg-gray-500 text-sm transition-all hover:bg-dark flex items-center gap-2 text-white px-3 py-1 rounded-md shadow-md">
              <BiVideo className="text-xl" /> UPLOAD LEARNING MATERIALS
            </button>
          </div>
          <div className="min-w-[40%] my-5">
            <h1
              className={`${
                theme === "dark" ? "text-dark-secondary" : "text-secondary"
              }text-sm mb-2 font-semibold`}
            >
              Tags
            </h1>
            <Select
              mode="multiple"
              // size={medium}

              placeholder="Please select"
              defaultValue={["a10", "c12"]}
              onChange={handleChange}
              style={{ width: "100%" }}
              options={options}
            />
          </div>
        </div>
        <Editor
          apiKey="rnsfc4uabmazxlfrlftk1jjdxng6bfquy9aa31d71b2r1mmw"
          // key={"rnsfc4uabmazxlfrlftk1jjdxng6bfquy9aa31d71b2r1mmw"}
          initialValue={""}
          init={{
            branding: false,
            height: 400,
            menubar: true,
            plugins:
              "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
            toolbar:
              "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
            image_advtab: true,
            content_style: "@/styles/component.css",
          }}
          onEditorChange={handleEditorChange} // Use onEditorChange to capture content changes
        />
        {/* //!!!! very important code */}
        {/* <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="prose max-w-full prose-h2:my-0 prose-h2:mb-2 prose-p:my-0 prose-h1:text-2xl prose-p:text-md md:prose-li:text-md md:prose-ol:text-md"
        ></div> */}
        <div className="my-10">
          <div className="flex gap-3 items-end justify-start mb-2 mt-4">
            <button
              type="submit"
              className="shadow-md font-semibold text-base bg-primary  text-white hover:bg-secondary transition-all px-2 py-1 border border-primary rounded-md"
            >
              Save
            </button>
            <button className="shadow-md font-semibold text-base bg-gray-100  text-black hover:bg-gray-200 transition-all px-2 py-1 border border-gray-300 rounded-md">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default instructionPage;

instructionPage.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <LibraryLayout>{page}</LibraryLayout>
    </RootLayout>
  );
};

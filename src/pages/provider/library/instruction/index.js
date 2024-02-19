/* eslint-disable react-hooks/rules-of-hooks */
import LibraryLayout from "@/component/Layouts/LibraryLayout";
import RootLayout from "@/component/Layouts/RootLayout";
import { Editor } from "@tinymce/tinymce-react";
import { Select, Upload } from "antd";
import { useTheme } from "next-themes";
import { useState } from "react";
import { BiVideo } from "react-icons/bi";
import { MdDeleteOutline, MdDone } from "react-icons/md";

const instructionPage = () => {
  //! Theme system
  const { theme } = useTheme();

  //! Input editor
  const [content, setContent] = useState(""); // State to hold the content
  const handleEditorChange = (content, editor) => {
    setContent(content); // Update the state with the new content
    // console.log(content); // Log the content to the console
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
    // console.log(`Selected: ${value}`);
  };

  const props = {
    // name: "file",
    // action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    // headers: {
    //   authorization: "authorization-text",
    // },
    // onChange(info) {
    //   if (info.file.status !== "uploading") {
    //     console.log(info.file, info.fileList);
    //   }
    //   if (info.file.status === "done") {
    //     message.success(`${info.file.name} file uploaded successfully`);
    //   } else if (info.file.status === "error") {
    //     message.error(`${info.file.name} file upload failed.`);
    //   }
    // },
  };

  return (
    <div className="">
      <div
        className={`${
          theme === "dark" ? "bg-dark-primary border-none" : "bg-white"
        }  min-h-[100vh] lg:p-5 p-2 w-full `}
      >
        {" "}
        <div className="">
          <div className="flex items-center justify-end flex-wrap gap-3">
            <button className="bg-gray-500 text-sm transition-all hover:bg-dark flex items-center gap-2 text-white px-3 pt-1 rounded-md shadow-md">
              <Upload {...props}>
                <div
                  className="flex items-center gap-2 text-white"
                  icon={<BiVideo className="" />}
                >
                  <BiVideo className="text-xl" /> UPLOAD INSTRUCTION VIDEO
                </div>
              </Upload>
            </button>
            <button className="bg-gray-500 text-sm transition-all hover:bg-dark flex items-center gap-2 text-white px-3 pt-1 rounded-md shadow-md">
              <Upload {...props}>
                <div
                  className="flex items-center gap-2 text-white"
                  icon={<BiVideo className="" />}
                >
                  <BiVideo className="text-xl" /> UPLOAD LEARNING MATERIALS
                </div>
              </Upload>
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
            content_style: "@/styles/textEditor.css",
          }}
          onEditorChange={handleEditorChange} // Use onEditorChange to capture content changes
        />
        {/* //!!!! very important code */}
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="prose max-w-full prose-h2:my-0 prose-h2:mb-2 prose-p:my-0 prose-h1:text-2xl prose-p:text-md md:prose-li:text-md md:prose-ol:text-md"
        ></div>
        <div className="my-10">
          <div className="flex items-end justify-end gap-2 mt-2">
            <button className=" border-secondary flex items-center border rounded-sm">
              <MdDone className=" text-white bg-secondary  px-1 py-[2px] text-[28px]" />
              <span className="px-2 py-[6px] bg-primary transition-all hover:bg-secondary text-white text-xs">
                Save
              </span>
            </button>
            <button className=" border-rose-600 flex items-center border rounded-sm">
              <MdDeleteOutline className=" text-white bg-rose-700  px-1 py-[2px] text-[28px]" />
              <span className="px-2 py-[6px] bg-rose-500 transition-all hover:bg-rose-600 text-white text-xs">
                Cancel
              </span>
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

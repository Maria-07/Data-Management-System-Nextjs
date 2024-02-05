import { Editor } from "@tinymce/tinymce-react";
import { Modal, Select } from "antd";
import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const SessionNoteModal = ({ handleClose, clicked }) => {
  //! Input editor
  const [content, setContent] = useState(""); // State to hold the content
  const handleEditorChange = (content, editor) => {
    // setContent(content); // Update the state with the new content
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
  return (
    <div>
      <Modal
        open={clicked}
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={700}
        closable={false}
        className="box"
      >
        <div className="">
          <div className="flex items-center justify-between">
            <h1 className="text-xl text-primary font-semibold tracking-tight">
              Edit Session Note
            </h1>

            <IoMdCloseCircleOutline
              onClick={handleClose}
              className="text-gray-500 text-2xl hover:text-primary"
            />
          </div>
          <div className="bg-gray-200 py-[1px] mt-3"></div>
          <form>
            <div className="min-w-[20%] my-5">
              <h1 className="text-base text-secondary mb-2 font-medium">
                SESSION NOTES
              </h1>
              <Select
                // mode="multiple"
                // size={medium}
                placeholder="Select a session note template"
                // defaultValue={["a10", "c12"]}
                onChange={handleChange}
                style={{ width: "100%" }}
                options={options}
              />
            </div>
            <Editor
              apiKey="rnsfc4uabmazxlfrlftk1jjdxng6bfquy9aa31d71b2r1mmw"
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
            <div className="flex gap-3 items-end justify-end mb-2 mt-4">
              <button type="submit" className="dcm-modal-submit-button">
                Ok
              </button>
              <button onClick={handleClose} className="dcm-modal-close-button">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SessionNoteModal;

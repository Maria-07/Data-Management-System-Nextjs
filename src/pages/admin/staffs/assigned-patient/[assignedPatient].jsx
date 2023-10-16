import RootLayout from "@/component/Layouts/RootLayout";
import StaffLayout from "@/component/Layouts/StaffLayout";

const AssignedPatient = () => {
  return (
    <div>
      {" "}
      <div className="h-[100vh]">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 my-2 gap-x-2 gap-y-1">
          <div className="w-full ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">
              All Patients
            </label>
            <select
              multiple={true}
              className="text-black border h-48 overflow-auto border-gray-300  rounded-sm focus:focus:ring-[#02818F] focus:border-[#0AA7B8] block w-full py-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-[#02818F] dark:focus:[#02818F]"
            >
              <option className="px-2 text-sm">oioioioi</option>
              <option className="px-2 text-sm">oioioioi</option>
              <option className="px-2 text-sm">oioioioi</option>
              <option className="px-2 text-sm">oioioioi</option>
              <option className="px-2 text-sm">oioioioi</option>
              <option className="px-2 text-sm">oioioioi</option>{" "}
              <option className="px-2 text-sm">oioioioi</option>
              <option className="px-2 text-sm">oioioioi</option>
              <option className="px-2 text-sm">oioioioi</option>
            </select>
          </div>

          <div className="flex flex-col justify-center items-center">
            <button className="dtm-button w-[70px]" type="submit">
              Add
            </button>
            <button className="dcm-close-button  my-2" type="submit">
              Remove
            </button>
          </div>
          <div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">
                Assigned Patients
              </label>
              <select
                multiple={true}
                className="text-black border h-48 border-gray-300  rounded-sm focus:focus:ring-[#02818F] focus:border-[#0AA7B8] block w-full py-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-[#02818F] dark:focus:[#02818F]"
              >
                <option className="px-2 text-sm">oioioioi</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedPatient;

AssignedPatient.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <StaffLayout>{page}</StaffLayout>
    </RootLayout>
  );
};

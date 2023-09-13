import { motion } from "framer-motion";
import { settingsSidebar } from "../UI/Layouts/LinksList";
import SettingSidebar from "../UI/Layouts/Sidebar/SettingSidebar";
const SettingLayout = ({ children }) => {
  return (
    <div>
      <div className="flex lg:flex-nowrap md:flex-wrap flex-wrap gap-2 justify-between">
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className=" p-2 my-2 setting-nav border rounded-md min-h-screen"
        >
          {settingsSidebar.map((s, i) => (
            <SettingSidebar key={i} data={s}></SettingSidebar>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className=" sm:m-2 sm:p-4  setting-body shadow-md rounded-lg min-h-screen"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default SettingLayout;

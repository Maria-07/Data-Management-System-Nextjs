import { motion } from "framer-motion";
import { settingsSidebar } from "../UI/Layouts/LinksList";
import SettingSidebar from "../UI/Layouts/Sidebar/SettingSidebar";
import { useTheme } from "next-themes";
const SettingLayout = ({ children }) => {
  //! Theme system
  const { theme } = useTheme();
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  // if (!mounted) return null;

  //! Theme system done
  return (
    <div>
      <div className="grid sm:grid-cols-12 grid-cols-1">
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className={`p-2 my-2 border-[1px] lg:col-span-2 shadow-md rounded-md min-h-screen ${
            theme === "dark"
              ? "bg-dark-background border-dark-background"
              : "secondary"
          }`}
        >
          {settingsSidebar.map((s, i) => (
            <SettingSidebar key={i} data={s}></SettingSidebar>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className={`sm:m-2 sm:p-4 lg:col-span-10 md:col-span-11 border-[1px] shadow-md rounded-lg min-h-screen ${
            theme === "dark"
              ? "bg-dark-background border-dark-background"
              : "secondary"
          }`}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default SettingLayout;

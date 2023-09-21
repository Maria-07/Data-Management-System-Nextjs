import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const Footer = () => {
  //! Theme system
  const { theme } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className={` shadow-md lg:ml-[98px] lg:mr-[22px] mx-2 text-center mb-3 mt-3 py-4 ${
        theme === "dark" ? "bg-dark-primary border-none" : "bg-white"
      }  rounded-3xl border`}
      // className={
      //   sideFixed
      //     ? "shadow-md text-center mb-3 mt-3 py-4 ml-[280px] bg-white rounded-3xl"
      //     : "shadow-md lg:ml-[98px] lg:mr-[22px] mx-2 text-center mb-3 mt-3 py-4 bg-white rounded-3xl"
      // }
    >
      <h4 className=" text-sm  p-2 font-medium lg:p-0">
        Copyright 2023 © <span className=" text-secondary">TherapyDCM</span>.
        All rights reserved.
      </h4>
    </motion.div>
  );
};

export default Footer;

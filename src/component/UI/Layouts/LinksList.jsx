/* eslint-disable react-hooks/rules-of-hooks */
import { AiFillBank } from "react-icons/ai";
import { BiData, BiDockTop } from "react-icons/bi";

export const settingsSidebar = [
  {
    icon: <BiData />,
    link_name: "Program Data",
    link: "/settings/program-data",
  },
  {
    icon: <BiDockTop />,
    link_name: "Domain",
    link: "/settings/domain",
  },
  {
    icon: <AiFillBank />,
    link_name: "Organization",
    link: "/settings/organization",
  },
];

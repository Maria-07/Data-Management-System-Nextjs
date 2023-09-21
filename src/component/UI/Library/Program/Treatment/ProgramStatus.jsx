import { AlignCenterOutlined } from "@ant-design/icons";
import { useState } from "react";
import {
  BiCut,
  BiRun,
  BiSolidHand,
  BiSolidWatch,
  BiWindowClose,
} from "react-icons/bi";

const ProgramStatus = ({ pStatus, theme, icon }) => {
  const [status, setStatus] = useState("active");
  const programStatus = [
    {
      pStatus: "waiting",
      icon: <BiSolidWatch />,
    },
    {
      pStatus: "BaseLine",
      icon: <AlignCenterOutlined />,
    },
    {
      pStatus: "Active",
      icon: <BiRun />,
    },
    {
      pStatus: "Hold",
      icon: <BiSolidHand />,
    },
    {
      pStatus: "Closed",
      icon: <BiWindowClose />,
    },
    {
      pStatus: "Disconnect",
      icon: <BiCut />,
    },
  ];

  return (
    <div>
      {programStatus?.map((s, i) => (
        <div key={i} className="flex items-center justify-center my-2">
          <button
            onClick={() => setStatus(s.pStatus)}
            className={
              status === s.pStatus
                ? `mx-auto  rounded-md p-3 border-primary border  text-primary transition-all h-[90px] w-[120px]`
                : `mx-auto  rounded-md p-3 ${
                    theme === "dark"
                      ? "hover:border-secondary hover:text-primary"
                      : "hover:border-secondary hover:text-secondary"
                  }  transition-all h-[90px] w-[120px]`
            }
          >
            <div className="text-2xl flex items-center justify-center">
              {s.icon}
            </div>
            <h1 className="text-sm font-semibold mt-2">{s.pStatus}</h1>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProgramStatus;

{
  /* <div className="">
  {programStatus?.map((s, i) => (
    <ProgramStatus
      key={i}
      pStatus={s.pStatus}
      status={status}
      setStatus={setStatus}
      theme={theme}
      icon={s.icon}
    ></ProgramStatus>
  ))}
</div>; */
}

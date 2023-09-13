import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiBody, BiDetail, BiPodcast, BiVideoRecording } from "react-icons/bi";

const LibrarySidebar = () => {
  const currentRoute = usePathname();
  return (
    <div className="">
      <div>
        <Link href={"/library/treatment"}>
          <div
            className={
              currentRoute === "/library/treatment"
                ? "px-5 py-10 border border-l-primary text-primary bg-gray-50 border-l-4 border-r-0"
                : "px-5 py-10 border text-dark hover:text-primary transition-all"
            }
          >
            <BiBody className="text-center mx-auto mb-3 text-2xl" />
            <h1 className="text-center font-semibold text-sm">TREATMENT</h1>
          </div>
        </Link>
      </div>
      <div>
        <Link href={"/library/instruction"}>
          <div
            className={
              currentRoute === "/library/instruction"
                ? "px-5 py-10 border border-l-primary text-primary bg-gray-50 border-l-4 border-r-0"
                : "px-5 py-10 border text-dark hover:text-primary transition-all"
            }
          >
            <BiDetail className="text-center mx-auto mb-3 text-2xl" />
            <h1 className="text-center font-semibold text-sm">INSTRUCTION</h1>
          </div>
        </Link>
      </div>
      <div>
        <Link href={"/library/target"}>
          <div
            className={
              currentRoute === "/library/target"
                ? "px-5 py-10 border border-l-primary text-primary bg-gray-50 border-l-4 border-r-0"
                : "px-5 py-10 border text-dark hover:text-primary transition-all"
            }
          >
            <BiPodcast className="text-center mx-auto mb-3 text-2xl" />
            <h1 className="text-center font-semibold text-sm">TARGET</h1>
          </div>
        </Link>
      </div>

      <div>
        <Link href={"/library/dataRecording"}>
          <div
            className={
              currentRoute === "/library/dataRecording"
                ? "px-5 py-10 border border-l-primary text-primary bg-gray-50 border-l-4 border-r-0"
                : "px-5 py-10 border text-dark hover:text-primary transition-all"
            }
          >
            <BiVideoRecording className="text-center mx-auto mb-3 text-2xl" />
            <h1 className="text-center font-semibold text-sm">
              DATA RECORDING
            </h1>
          </div>
        </Link>
      </div>
      <div>
        <Link href={""}>
          <div className="border-r-[1px] py-28"></div>
        </Link>
      </div>
    </div>
  );
};

export default LibrarySidebar;

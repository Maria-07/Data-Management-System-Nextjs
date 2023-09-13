import Link from "next/link";
import { usePathname } from "next/navigation";

const SettingSidebar = ({ data }) => {
  const currentRoute = usePathname();
  const { icon, link_name, link } = data;
  return (
    <div>
      <Link
        className={
          currentRoute === link
            ? "flex items-center gap-2 rounded-md px-2 border-[2px] h-8 my-item-button text-sm font-medium leading-5 tracking-wide my-3 pt-1 pb-1 transition hover:border-secondary ease-in-out duration-300 bg-secondary border-secondary text-white hover:bg-secondary hover:text-white"
            : "flex items-center gap-2 rounded-md px-2 text-dark border-[2px] h-8 my-item-button text-sm font-medium leading-5 tracking-wide my-3 pt-1 pb-1 transition hover:border-secondary ease-in-out duration-300 hover:bg-secondary hover:text-white"
        }
        href={link}
      >
        <span className="text-xl">{icon}</span>
        {link_name}
      </Link>
    </div>
  );
};

export default SettingSidebar;

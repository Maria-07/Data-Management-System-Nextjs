// components/ThemeSwitcher.js

import { useTheme } from "next-themes";
import { BiSolidMoon, BiSun } from "react-icons/bi";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      className={`${
        theme === "dark" ? "text-white" : "text-secondary"
      } rounded-md p-1 mt-1`}
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <>
          <BiSun />
        </>
      ) : (
        <>
          <BiSolidMoon />
        </>
      )}
    </button>
  );
};

export default ThemeSwitcher;

import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import "@/styles/sidebar.css";
import "@/styles/component.css";
import "@/styles/antd5Custom.css";
import "@/styles/settings.css";
import "@/styles/CustomDateRange.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
// import "@/styles/textEditor.css";
import { Provider } from "react-redux";
import store from "@/Redux/store";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <ToastContainer />
      <ThemeProvider enableSystem={true} attribute="class">
        <Provider store={store}>
          <SessionProvider session={pageProps.session}>
            {getLayout(<Component {...pageProps} />)}
          </SessionProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}

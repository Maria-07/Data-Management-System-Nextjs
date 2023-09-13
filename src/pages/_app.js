import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import "@/styles/sidebar.css";
import "@/styles/component.css";
import "@/styles/antd5Custom.css";
import { Provider } from "react-redux";
import store from "@/Redux/store";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Provider store={store}>
        <SessionProvider session={pageProps.session}>
          {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
      </Provider>
    </>
  );
}

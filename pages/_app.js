import { Fragment } from "react";
import Head from "next/head";
import { initializeApp } from "firebase/app";
import { Provider } from "react-redux";

import { firebaseConfig } from "../config/firebaseConfig";
import store from "../store/index";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  initializeApp(firebaseConfig);
  return (
    <Fragment>
      <Head>
        <title>Slack clone using Next.js</title>
        <meta name="description" content="Slack clone using Next.js" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Fragment>
  );
}

export default MyApp;

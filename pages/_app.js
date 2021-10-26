import { Fragment } from "react";
import Head from "next/head";
import { initializeApp } from "firebase/app";

import { firebaseConfig } from "../config/firebaseConfig";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  initializeApp(firebaseConfig);
  return (
    <Fragment>
      <Head>
        <title>Slack clone using Next.js</title>
        <meta name="description" content="Slack clone using Next.js" />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;

import Link from "next/link";
import { Fragment } from "react";
import { useSelector } from "react-redux";

import Header from "../components/Header";
import SideBar from "../components/SideBar";
import styles from "../styles/Home.module.css";

export default function Home() {
  console.log(useSelector((state) => state.authState));
  return (
    <Fragment>
      <Header />
      <main className={styles.main}>
        <SideBar />
      </main>
    </Fragment>
  );
}

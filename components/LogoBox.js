import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "./LogoBox.module.scss";

function LogoBox() {
  const router = useRouter();

  const clickHandler = () => {
    router.push("/");
  };

  return (
    <div onClick={clickHandler} className={styles.logoBox}>
      <div className={styles.logoBox__logoContainer}>
        <Image src="/slack_logo.png" layout="fill" />
      </div>
      <div className={styles.logoBox__titleBox}>
        <h1 className={styles.logoBox__title}>slack</h1>
      </div>
    </div>
  );
}

export default LogoBox;

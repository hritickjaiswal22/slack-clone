import React from "react";

import Channel from "./Channel";
import styles from "./SideBar.module.scss";

function SideBar() {
  return (
    <section className={styles.sideBar}>
      <Channel />
    </section>
  );
}

export default SideBar;

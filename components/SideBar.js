import React from "react";

import Channel from "./Channel";
import Users from "./Users";
import styles from "./SideBar.module.scss";

function SideBar() {
  return (
    <section className={styles.sideBar}>
      <Channel />
      <Users />
    </section>
  );
}

export default SideBar;

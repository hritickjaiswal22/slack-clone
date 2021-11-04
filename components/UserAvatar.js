import React from "react";

import styles from "./UserAvatar.module.scss";

function UserAvatar({ userName }) {
  return (
    <div className={styles.userAvatar}>
      {userName !== null ? userName[0] : ""}
    </div>
  );
}

export default UserAvatar;

import React from "react";
import { useSelector } from "react-redux";

import styles from "./ChatsHeader.module.scss";

function ChatsHeader() {
  const { selectedChannel } = useSelector((state) => state.channelState);
  const { selectedUserName } = useSelector((state) => state.usersState);

  return (
    <header className={styles.header}>
      <h1 className={styles.header__heading}>
        {selectedChannel ? selectedChannel : selectedUserName}
      </h1>
      <h2 className={styles.header__details}>Details</h2>
    </header>
  );
}

export default ChatsHeader;

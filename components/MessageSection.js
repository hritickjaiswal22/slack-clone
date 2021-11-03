import React from "react";

import MessageInput from "./MessageInput";
import styles from "./MessageSection.module.scss";

function MessageSection() {
  return (
    <div className={styles.messageSection}>
      <h1>MessageSection</h1>
      <MessageInput />
    </div>
  );
}

export default MessageSection;

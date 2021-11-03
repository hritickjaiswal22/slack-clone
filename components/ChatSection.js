import React from "react";

import ChatsHeader from "./ChatsHeader";
import styles from "./ChatSection.module.scss";

function ChatSection() {
  return (
    <section className={styles.chatSection}>
      <ChatsHeader />
      <h1>ChatSection</h1>
    </section>
  );
}

export default ChatSection;

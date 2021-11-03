import React from "react";

import ChatsHeader from "./ChatsHeader";
import MessageSection from "./MessageSection";
import styles from "./ChatSection.module.scss";

function ChatSection() {
  return (
    <section className={styles.chatSection}>
      <ChatsHeader />
      <MessageSection />
    </section>
  );
}

export default ChatSection;

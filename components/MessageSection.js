import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ref, onValue, getDatabase } from "firebase/database";

import MessageInput from "./MessageInput";
import UserAvatar from "./UserAvatar";
import styles from "./MessageSection.module.scss";

function MessageSection() {
  const { selectedChannelId } = useSelector((state) => state.channelState);
  const [messages, setMessages] = useState({});

  const database = getDatabase();

  useEffect(() => {
    const messagesRef = ref(database, `messages/${selectedChannelId}`);
    onValue(messagesRef, (snap) => {
      setMessages(snap.val());
    });
  }, [selectedChannelId]);

  const displayMessages = () => {
    if (
      messages === null ||
      messages === undefined ||
      Object.keys(messages).length === 0
    ) {
      return;
    } else {
      return Object.values(messages).map(({ content, user, timestamp }) => (
        <div key={timestamp} className={styles.message}>
          <UserAvatar userName={user.name} />
          <div>
            <span className={styles.message__user}>{user.name}</span>
            <span className={styles.message__timestamp}>
              {new Date(timestamp).toUTCString()}
            </span>
            <p className={styles.message__content}>{content}</p>
          </div>
        </div>
      ));
    }
  };

  return (
    <div className={styles.messageSection}>
      {displayMessages()}
      <MessageInput />
    </div>
  );
}

export default MessageSection;

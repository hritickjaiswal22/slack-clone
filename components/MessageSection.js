import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ref, onValue, getDatabase } from "firebase/database";
import Image from "next/image";

import MessageInput from "./MessageInput";
import UserAvatar from "./UserAvatar";
import styles from "./MessageSection.module.scss";

function MessageSection() {
  const { selectedChannelId } = useSelector((state) => state.channelState);
  const { userEmail } = useSelector((state) => state.authState);
  const { selectedUserId } = useSelector((state) => state.usersState);
  const [messages, setMessages] = useState({});

  const database = getDatabase();

  useEffect(() => {
    const path = selectedChannelId
      ? `messages/${selectedChannelId}`
      : `messages/${userEmail.split(".")[0]}/${selectedUserId}`;
    const messagesRef = ref(database, path);
    onValue(messagesRef, (snap) => {
      setMessages(snap.val());
    });
  }, [selectedChannelId, selectedUserId]);

  const displayMessages = () => {
    if (
      messages === null ||
      messages === undefined ||
      Object.keys(messages).length === 0
    ) {
      return;
    } else {
      return Object.values(messages).map(
        ({ content, user, timestamp, image }) => (
          <div key={timestamp} className={styles.message}>
            <UserAvatar userName={user.name} />
            <div className={styles.message__contentBox}>
              <span className={styles.message__user}>{user.name}</span>
              <span className={styles.message__timestamp}>
                {new Date(timestamp).toUTCString()}
              </span>
              <p className={styles.message__content}>{content}</p>
              {image ? <Image src={image} width="600" height="200" /> : ""}
            </div>
          </div>
        )
      );
    }
  };

  return (
    <div className={styles.messageSection}>
      {selectedChannelId === null && selectedUserId === null ? (
        <h1 className={styles.messageSection__extra}>
          In this section you can message yourself, but remember you'll have to
          provide for both sides of the conversation
        </h1>
      ) : (
        ""
      )}
      {displayMessages()}
      <MessageInput />
    </div>
  );
}

export default MessageSection;

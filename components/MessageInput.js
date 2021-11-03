import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  set,
  push,
  serverTimestamp,
} from "firebase/database";

import styles from "./MessageInput.module.scss";

function MessageInput() {
  const { selectedChannel, selectedChannelId } = useSelector(
    (state) => state.channelState
  );
  const { userName } = useSelector((state) => state.authState);

  const [message, setMessage] = useState("");

  const database = getDatabase();

  const submitHandler = () => {
    const messagesRef = ref(database, `messages/${selectedChannelId}`);
    const newMessageRef = push(messagesRef);

    set(newMessageRef, {
      user: {
        name: userName,
      },
      content: message,
      timestamp: serverTimestamp(),
    });
    setMessage("");
  };

  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.inputContainer__input}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        type="text"
        placeholder={`message ${selectedChannel}`}
      />
      <button onClick={submitHandler} className={styles.inputContainer__btn}>
        &#10149;
      </button>
    </div>
  );
}

export default MessageInput;

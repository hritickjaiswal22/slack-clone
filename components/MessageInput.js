import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  set,
  push,
  serverTimestamp,
} from "firebase/database";

import FileInputModal from "./FileInputModal";
import styles from "./MessageInput.module.scss";

function MessageInput() {
  const { selectedChannel, selectedChannelId } = useSelector(
    (state) => state.channelState
  );
  const { selectedUserName, selectedUserId } = useSelector(
    (state) => state.usersState
  );
  const { userName, userEmail } = useSelector((state) => state.authState);

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const database = getDatabase();

  const submitHandler = () => {
    if (message.length === 0) return;
    const path = selectedChannelId
      ? `messages/${selectedChannelId}`
      : `messages/${userEmail.split(".")[0]}/${selectedUserId}`;
    const path2 = `messages/${selectedUserId}/${userEmail.split(".")[0]}`;

    const messagesRef = ref(database, path);
    const newMessageRef = push(messagesRef);

    set(newMessageRef, {
      user: {
        name: userName,
      },
      content: message,
      timestamp: serverTimestamp(),
    });

    if (!selectedChannelId) {
      const messagesRef2 = ref(database, path2);
      const newMessageRef2 = push(messagesRef2);

      set(newMessageRef2, {
        user: {
          name: userName,
        },
        content: message,
        timestamp: serverTimestamp(),
      });
    }

    setMessage("");
  };

  return (
    <div className={styles.inputContainer}>
      <FileInputModal showModal={showModal} setShowModal={setShowModal} />
      <input
        className={styles.inputContainer__input}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        type="text"
        placeholder={
          selectedChannelId
            ? `message #${selectedChannel}`
            : `message @${selectedUserName}`
        }
      />
      <button onClick={submitHandler} className={styles.inputContainer__btn}>
        &#10149;
      </button>
      <button
        onClick={() => setShowModal(true)}
        className={`${styles.inputContainer__btn} ${styles.rotatedBtn}`}
      >
        &#10149;
      </button>
    </div>
  );
}

export default MessageInput;

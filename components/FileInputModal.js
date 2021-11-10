import React, { useState } from "react";
import { v4 } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref as databaseRef,
  set,
  push,
  serverTimestamp,
} from "firebase/database";

import Button from "./Button";
import styles from "./FileInputModal.module.scss";

function FileInputModal({ showModal, setShowModal }) {
  const [fileState, setFileState] = useState(null);

  const { selectedChannel, selectedChannelId } = useSelector(
    (state) => state.channelState
  );
  const { selectedUserName, selectedUserId } = useSelector(
    (state) => state.usersState
  );
  const { userName, userEmail } = useSelector((state) => state.authState);

  const database = getDatabase();

  const closeModal = () => {
    setFileState(null);
    setShowModal(false);
  };

  const uploadFile = () => {
    if (
      fileState &&
      (fileState.type === "image/jpeg" ||
        fileState.type === "image/png" ||
        fileState.type === "image/jpg")
    ) {
      const filePath = `chat/images/${v4()}.jpg`;
      const storage = getStorage();
      const storageRef = ref(storage, filePath);
      const path = selectedChannelId
        ? `messages/${selectedChannelId}`
        : `messages/${userEmail.split(".")[0]}/${selectedUserId}`;
      const path2 = `messages/${selectedUserId}/${userEmail.split(".")[0]}`;

      const messagesRef = databaseRef(database, path);
      const newMessageRef = push(messagesRef);

      const messagesRef2 = databaseRef(database, path2);
      const newMessageRef2 = push(messagesRef2);

      uploadBytes(storageRef, fileState)
        .then((snapshot) => {
          setFileState(null);
          closeModal();
          getDownloadURL(ref(storage, filePath)).then((url) => {
            set(newMessageRef, {
              user: {
                name: userName,
              },
              content: "",
              image: url,
              timestamp: serverTimestamp(),
            });

            set(newMessageRef2, {
              user: {
                name: userName,
              },
              content: "",
              image: url,
              timestamp: serverTimestamp(),
            });
          });
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <aside
      className={
        showModal ? `${styles.modal} ${styles.showModal}` : styles.modal
      }
    >
      <div className={styles.modalContent}>
        <h1 className={styles.modalContent__title}>Choose a file for upload</h1>
        <label className={styles.modalContent__fileInputLabel} htmlFor="file">
          Select an image file
        </label>
        <input
          type="file"
          name="file"
          id="file"
          onChange={(e) => setFileState(e.target.files[0])}
          className={styles.modalContent__fileInput}
        ></input>
        <Button
          onClick={uploadFile}
          className="btn__small"
          content="Upload"
          loading={false}
        />
        <Button
          onClick={closeModal}
          className="btn__small"
          content="Close"
          loading={false}
        />
      </div>
    </aside>
  );
}

export default FileInputModal;

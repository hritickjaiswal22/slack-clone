import React, { useState } from "react";
import { getDatabase, ref, set, push } from "firebase/database";
import { useSelector } from "react-redux";

import Button from "./Button";
import styles from "./InputModal.module.scss";

function InputModal({ showModal, setShowModal }) {
  const closeModal = () => {
    setShowModal(false);
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const userName = useSelector((state) => state.authState.userName);

  const database = getDatabase();
  const channelsRef = ref(database, "channels");

  const createChannel = () => {
    const newChannelRef = push(channelsRef);
    const key = newChannelRef.key;

    if (name.length > 0) {
      set(newChannelRef, {
        key: key,
        name: name,
        description: description,
        createdBy: {
          name: userName,
        },
      });
      setName("");
      setDescription("");
      closeModal();
    }
  };

  return (
    <aside
      className={
        showModal ? `${styles.modal} ${styles.showModal}` : styles.modal
      }
    >
      <div className={styles.modalContent}>
        <h1 className={styles.modalContent__title}>Create a channel</h1>
        <p className={styles.modalContent__description}>
          Channels are where your team communicates. They're best when organised
          around a topic -#marketing for example
        </p>
        <label className={styles.modalContent__inputLabel}>Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className={styles.modalContent__input}
        />
        <label className={styles.modalContent__inputLabel}>Description</label>
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          className={styles.modalContent__input}
        />
        <Button
          onClick={createChannel}
          className="btn__small"
          content="Create"
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

export default InputModal;

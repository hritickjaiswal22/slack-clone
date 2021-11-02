import React, { useState, useEffect } from "react";
import { ref, onValue, getDatabase } from "firebase/database";

import InputModal from "./InputModal";
import styles from "./Channel.module.scss";

function Channel() {
  const [showModal, setShowModal] = useState(false);
  const [channels, setChannels] = useState([]);

  const database = getDatabase();
  const channelsRef = ref(database, "channels");

  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    onValue(channelsRef, (snap) => setChannels(snap.val()));
  }, []);

  const displayChannel = () => {
    const values = Object.values(channels);

    if (values.length > 0) {
      return values.map(({ key, name }) => (
        <div key={key} className={styles.channels__listItem}>{`# ${name}`}</div>
      ));
    }
  };

  return (
    <section className={styles.channels}>
      <InputModal showModal={showModal} setShowModal={setShowModal} />
      <div className={styles.channels__headingBox}>
        <h1 className={styles.channels__heading}>&#9660; Channels</h1>
        <span onClick={openModal} className={styles.channels__add}>
          +
        </span>
      </div>
      <div className={styles.channels__list}>{displayChannel()}</div>
    </section>
  );
}

export default Channel;

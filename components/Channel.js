import React, { useState, useEffect } from "react";
import { ref, onValue, getDatabase } from "firebase/database";
import { useDispatch } from "react-redux";

import { selectChannel } from "../slices/selectedChannelSlice";
import { selectUser } from "../slices/selectedUserSlice";
import InputModal from "./InputModal";
import styles from "./Channel.module.scss";

function Channel() {
  const [showModal, setShowModal] = useState(false);
  const [channels, setChannels] = useState([]);
  const dispatch = useDispatch();

  const database = getDatabase();
  const channelsRef = ref(database, "channels");

  const openModal = () => {
    setShowModal(true);
  };

  const channelSelectHandler = (e) => {
    dispatch(
      selectChannel({
        channelName: e.target.dataset.channelname,
        id: e.target.dataset.channelid,
      })
    );
    dispatch(
      selectUser({
        userName: null,
        id: null,
      })
    );
  };

  useEffect(() => {
    onValue(channelsRef, (snap) => setChannels(snap.val()));
  }, []);

  const displayChannel = () => {
    const values = Object.values(channels);

    if (values.length > 0) {
      return values.map(({ key, name }) => (
        <div
          data-channelname={name}
          data-channelid={key}
          key={key}
          className={styles.channels__listItem}
        >{`# ${name}`}</div>
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
      <div onClick={channelSelectHandler} className={styles.channels__list}>
        {displayChannel()}
      </div>
    </section>
  );
}

export default Channel;

import React, { useState, useEffect, useRef } from "react";
import { ref, onValue, getDatabase } from "firebase/database";
import { useDispatch } from "react-redux";

import { selectChannel } from "../slices/selectedChannelSlice";
import InputModal from "./InputModal";
import styles from "./Channel.module.scss";

function Channel() {
  const [showModal, setShowModal] = useState(false);
  const [channels, setChannels] = useState([]);
  const selectedChannelRef = useRef({ selectedChannel: null });
  const dispatch = useDispatch();

  const database = getDatabase();
  const channelsRef = ref(database, "channels");

  const openModal = () => {
    setShowModal(true);
  };

  const channelSelectHandler = (e) => {
    if (selectedChannelRef.current.selectedChannel !== null) {
      selectedChannelRef.current.selectedChannel.classList.remove(
        styles.selected
      );
    }
    selectedChannelRef.current.selectedChannel = e.target;
    e.target.classList.add(styles.selected);
    dispatch(
      selectChannel({
        channelName: e.target.dataset.channelname,
        id: e.target.dataset.channelid,
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

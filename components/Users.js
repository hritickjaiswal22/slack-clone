import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";

import { selectUser } from "../slices/selectedUserSlice";
import { selectChannel } from "../slices/selectedChannelSlice";
import styles from "./Users.module.scss";

function Users() {
  const [users, setUsers] = useState({});
  const currentUserEmail = useSelector((state) => state.authState.userEmail);
  const dispatch = useDispatch();

  const database = getDatabase();
  const usersRef = ref(database, "users");

  useEffect(() => {
    onValue(usersRef, (snap) => setUsers(snap.val()));
  }, []);

  const usersSelectHandler = (e) => {
    dispatch(
      selectUser({
        userName: e.target.dataset.username,
        id: e.target.dataset.userid,
      })
    );
    dispatch(
      selectChannel({
        channelName: null,
        id: null,
      })
    );
  };

  const displayUsers = () => {
    const values = Object.values(users);
    const keys = Object.keys(users);

    if (keys.length > 0) {
      return values.map((user) =>
        currentUserEmail !== user.email ? (
          <div
            data-username={user.username}
            data-userid={user.email.split(".")[0]}
            key={user.email}
            className={styles.users__listItem}
          >{`@ ${user.username}`}</div>
        ) : (
          ""
        )
      );
    }
  };

  return (
    <section className={styles.users}>
      <h1 className={styles.users__heading}>&#9660; Direct Messages</h1>
      <div onClick={usersSelectHandler} className={styles.users__list}>
        {displayUsers()}
      </div>
    </section>
  );
}

export default Users;

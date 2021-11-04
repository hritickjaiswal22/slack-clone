import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import UserAvatar from "./UserAvatar";
import { saveUser, saveUserName } from "../slices/userSlice";
import styles from "./Header.module.scss";

function Header() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.authState.userName);
  const router = useRouter();

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(saveUserName(null));
        dispatch(saveUser(null));
        router.push("/signin");
      })
      .catch((e) => console.log(e));
  };

  return (
    <header className={styles.header}>
      <UserAvatar userName={userName} />
      <h1 onClick={signOutHandler} className={styles.signOutText}>
        Sign Out
      </h1>
    </header>
  );
}

export default Header;

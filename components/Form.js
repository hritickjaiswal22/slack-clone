import React, { useRef, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";

import Button from "./Button";
import styles from "./Form.module.scss";

function Form({ emailPlaceHolder, authenticate }) {
  const auth = getAuth();
  const database = getDatabase();

  const [email, setEmail] = useState("");
  const emailRef = useRef();

  const [password, setPassword] = useState("");
  const passwordRef = useRef();

  const [userName, setUserName] = useState("");

  const checkEmail = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      emailRef.current.classList.add(styles.error);
      return false;
    }
    return true;
  };

  const checkPassword = () => {
    if (password.length < 6) {
      passwordRef.current.classList.add(styles.error);
      return false;
    }
    return true;
  };

  const saveUserInDB = (user) => {
    updateProfile(auth.currentUser, {
      displayName: userName,
    }).then(() => {
      console.log("Created user");
      const userCollectionRef = ref(database, "users");
      const newUserRef = push(userCollectionRef);
      set(newUserRef, {
        username: user.displayName,
        email: user.email,
      });
      console.log(user);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (checkEmail() === true && checkPassword() === true) {
      authenticate(auth, email, password)
        .then((userCredentials) => saveUserInDB(userCredentials.user))
        .catch((error) => console.log(error));
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <input
        onChange={(e) => {
          emailRef.current.classList.remove(styles.error);
          return setEmail(e.target.value);
        }}
        ref={emailRef}
        value={email}
        className={styles.form__input}
        type="text"
        placeholder={emailPlaceHolder}
      />
      <input
        onChange={(e) => {
          passwordRef.current.classList.remove(styles.error);
          return setPassword(e.target.value);
        }}
        ref={passwordRef}
        value={password}
        type="password"
        className={styles.form__input}
        placeholder="password"
      />
      <input
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
        type="text"
        className={styles.form__input}
        placeholder="username"
      />
      <Button content="Continue" className="btn--purple" />
    </form>
  );
}

export default Form;

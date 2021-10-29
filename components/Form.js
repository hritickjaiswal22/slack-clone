import React, { useRef, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";

import Button from "./Button";
import styles from "./Form.module.scss";

function Form({ emailPlaceHolder, authenticate, signupForm }) {
  const auth = getAuth();
  const database = getDatabase();

  const [email, setEmail] = useState("");
  const emailRef = useRef();

  const [password, setPassword] = useState("");
  const passwordRef = useRef();

  const [userName, setUserName] = useState("");

  const [loadingState, setLoadingState] = useState(false);

  const changeHandler = (current, parent, value) => {
    if (!value) {
      current.classList.add(styles.error);
      parent.classList.add(styles.error);
    } else {
      current.classList.remove(styles.error);
      parent.classList.remove(styles.error);
    }
  };

  const checkEmail = (value) => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value) ? true : false;
  };

  const emailHandler = (e) => {
    let value = e.target.value;
    const { current } = emailRef;
    const parent = current.parentElement;

    !checkEmail(value)
      ? changeHandler(current, parent, false)
      : changeHandler(current, parent, true);

    setEmail(value);
  };

  const checkPassword = (value) => {
    return value.length < 6 ? false : true;
  };

  const passwordHandler = (e) => {
    let value = e.target.value;
    const { current } = passwordRef;
    const parent = current.parentElement;

    !checkPassword(value)
      ? changeHandler(current, parent, false)
      : changeHandler(current, parent, true);

    setPassword(value);
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
      setLoadingState(false);
      console.log(user);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (checkEmail(email) === true && checkPassword(password) === true) {
      setLoadingState(true);
      authenticate(auth, email, password)
        .then((userCredentials) =>
          signupForm
            ? saveUserInDB(userCredentials.user)
            : setLoadingState(false)
        )
        .catch((error) => console.log(error));
    } else {
      console.log("Fix submitHandler");
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div
        className={`${styles.form__inputContainer} ${styles.form__emailInputContainer}`}
      >
        <input
          onChange={emailHandler}
          ref={emailRef}
          value={email}
          className={styles.form__input}
          type="email"
          placeholder={emailPlaceHolder}
        />
      </div>
      <div
        className={`${styles.form__inputContainer} ${styles.form__passwordInputContainer}`}
      >
        <input
          onChange={passwordHandler}
          ref={passwordRef}
          value={password}
          type="password"
          className={styles.form__input}
          placeholder="password"
        />
      </div>
      {signupForm ? (
        <div className={styles.form__inputContainer}>
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            className={styles.form__input}
            placeholder="username"
          />
        </div>
      ) : (
        ""
      )}
      <Button
        loading={loadingState}
        content="Continue"
        className="btn--purple"
      />
    </form>
  );
}

export default Form;

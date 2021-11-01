import React, { useRef, useState, Fragment } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import Button from "./Button";
import { saveUser, saveUserName } from "../slices/userSlice";
import styles from "./Form.module.scss";

function Form({ emailPlaceHolder, authenticate, signupForm }) {
  const auth = getAuth();
  const database = getDatabase();
  const dispatch = useDispatch();
  const router = useRouter();

  const errorBoxRef = useRef();

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
      const userCollectionRef = ref(database, "users");
      const newUserRef = push(userCollectionRef);
      set(newUserRef, {
        username: user.displayName,
        email: user.email,
      });
      setLoadingState(false);
      dispatch(saveUserName(user.displayName));
      dispatch(saveUser(user.accessToken));
      router.push("/");
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (checkEmail(email) === true && checkPassword(password) === true) {
      setLoadingState(true);
      authenticate(auth, email, password)
        .then((userCredentials) => {
          if (signupForm) {
            saveUserInDB(userCredentials.user);
          } else {
            setLoadingState(false);
            dispatch(saveUserName(userCredentials.user.displayName));
            dispatch(saveUser(userCredentials.user.accessToken));
            router.push("/");
          }
        })
        .catch((error) => {
          setLoadingState(false);
          errorBoxRef.current.innerText = error.message;
          errorBoxRef.current.classList.add(styles.visible);
        });
    } else {
      errorBoxRef.current.innerText = "Provide proper details";
      errorBoxRef.current.classList.add(styles.visible);
    }
  };

  return (
    <Fragment>
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
      <div ref={errorBoxRef} className={styles.errorBox}></div>
    </Fragment>
  );
}

export default Form;

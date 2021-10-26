import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import LogoBox from "../components/LogoBox";
import Form from "../components/Form";
import styles from "../styles/SignUp.module.scss";

function SignUp() {
  return (
    <main className={styles.main}>
      <LogoBox />
      <h1 className={styles.mainHeading}>Enter, your email and password</h1>
      <h3 className={styles.subHeading}>
        We suggest using the{" "}
        <strong className={styles.strong}>
          email address you use at work.
        </strong>
      </h3>
      <Form
        authenticate={createUserWithEmailAndPassword}
        emailPlaceHolder="name@work-email.com"
      />
    </main>
  );
}

export default SignUp;

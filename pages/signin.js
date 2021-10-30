import React from "react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";

import LogoBox from "../components/LogoBox";
import Form from "../components/Form";
import styles from "../styles/SignIn.module.scss";

function SignIn() {
  return (
    <main className={styles.main}>
      <aside className={styles.linkBox}>
        <p className={styles.linkBox__heading}>New to Slack?</p>
        <Link className={styles.linkBox__link} href="/signin">
          Create an account
        </Link>
      </aside>
      <LogoBox />
      <h1 className={styles.mainHeading}>Sign in to Slack</h1>
      <h3 className={styles.subHeading}>
        We suggest using the{" "}
        <strong className={styles.strong}>
          email address you use at work.
        </strong>
      </h3>
      <Form
        authenticate={signInWithEmailAndPassword}
        emailPlaceHolder="name@work-email.com"
        signupForm={false}
      />
    </main>
  );
}

export default SignIn;

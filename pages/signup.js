import React from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";

import LogoBox from "../components/LogoBox";
import Form from "../components/Form";
import styles from "../styles/SignUp.module.scss";

function SignUp() {
  return (
    <main className={styles.main}>
      <aside className={styles.linkBox}>
        <p className={styles.linkBox__heading}>Already a member?</p>
        <Link className={styles.linkBox__link} href="/signin">
          Sign In
        </Link>
      </aside>
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
        signupForm={true}
      />
    </main>
  );
}

export default SignUp;

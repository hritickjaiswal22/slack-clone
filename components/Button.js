import React from "react";

import styles from "./Button.module.scss";

function Button({ content, className }) {
  return (
    <button className={`${styles.btn} ${styles[className]}`}>{content}</button>
  );
}

export default Button;

import React from "react";

import styles from "./Button.module.scss";

function Button({ content, className, loading }) {
  return (
    <button className={`${styles.btn} ${styles[className]}`}>
      {loading ? <div className={styles.loader}></div> : content}
    </button>
  );
}

export default Button;

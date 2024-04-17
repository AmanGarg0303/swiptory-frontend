import React from "react";
import styles from "./navbar.module.css";

export const Navbar = () => {
  return (
    <div>
      <div className={styles.main_container}>
        <h1 className={styles.title}>SwipTory</h1>

        <div className={styles.btns}>
          <button className={styles.register}>Register Now</button>
          <button className={styles.login}>Sign In</button>
        </div>
      </div>
    </div>
  );
};

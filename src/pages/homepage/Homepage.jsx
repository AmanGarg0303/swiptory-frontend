import React from "react";
import styles from "./homepage.module.css";
import { Navbar } from "../../components/navbar/Navbar";

export default function Homepage() {
  return (
    <div className={styles.container}>
      <Navbar />
    </div>
  );
}

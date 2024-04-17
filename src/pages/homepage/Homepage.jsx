import React from "react";
import styles from "./homepage.module.css";
import { Navbar } from "../../components/navbar/Navbar";
import { Cards } from "../../components/cards/Cards";

export default function Homepage() {
  return (
    <div className={styles.container}>
      <Navbar />
      <Cards />
    </div>
  );
}

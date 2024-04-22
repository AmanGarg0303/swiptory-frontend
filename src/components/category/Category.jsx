import React from "react";
import styles from "./category.module.css";
import { Stories } from "../stories/Stories";

export const Category = ({ name }) => {
  return (
    <div className={styles.story}>
      <h4 className={styles.storyCat}>Top Stories about {name}</h4>
      <Stories />
      <button className={styles.seeMoreBtn}>See More</button>
    </div>
  );
};

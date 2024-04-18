import React from "react";
import styles from "./topStories.module.css";
import { Stories } from "../stories/Stories";

export const TopStories = () => {
  return (
    <div className={styles.container}>
      <div className={styles.story}>
        <h4 className={styles.storyCat}>Top Stories about Food</h4>
        <Stories />

        <button className={styles.seeMoreBtn}>See More</button>
      </div>

      <div className={styles.story}>
        <h4 className={styles.storyCat}>
          Top Stories about Health and Fitness
        </h4>
        <Stories />
      </div>

      <div className={styles.story}>
        <h4 className={styles.storyCat}>Top Stories about Travel</h4>
        <Stories />
      </div>

      <div className={styles.story}>
        <h4 className={styles.storyCat}>Top Stories about Movies</h4>
        <Stories />
      </div>

      <div className={styles.story}>
        <h4 className={styles.storyCat}>Top Stories about Education</h4>
        <Stories />
      </div>
    </div>
  );
};

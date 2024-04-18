import React from "react";
import styles from "./bookmarks.module.css";
import { Stories } from "../../components/stories/Stories";

const Bookmarks = () => {
  return (
    <div className={styles.container}>
      <div className={styles.stories}>
        <h4 className={styles.heading}>Your Bookmarks</h4>
        <Stories />
        <button className={styles.seeMoreBtn}>See More</button>
      </div>
    </div>
  );
};

export default Bookmarks;

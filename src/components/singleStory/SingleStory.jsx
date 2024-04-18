import React from "react";
import styles from "./singleStory.module.css";

export const SingleStory = () => {
  return (
    <div className={styles.singleStory}>
      <img
        src="https://i.pinimg.com/474x/38/9c/ab/389cab4fab3baa1227257cd58e765237.jpg"
        alt=""
        className={styles.storyImage}
      />
      <div className={styles.dark}></div>
      <div className={styles.storyContent}>
        <h6 className={styles.storyTitle}>Thor</h6>
        <p className={styles.storyDesc}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis
          dicta, vero soluta quidem natus ratione non tempore et expedita.
          Similique?
        </p>
      </div>
    </div>
  );
};

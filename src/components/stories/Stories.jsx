import React from "react";
import styles from "./stories.module.css";
import { SingleStory } from "../singleStory/SingleStory";

export const Stories = () => {
  return (
    <div className={styles.container}>
      <SingleStory />
      <SingleStory />
      <SingleStory />
      {/* <SingleStory />
      <SingleStory /> */}
    </div>
  );
};

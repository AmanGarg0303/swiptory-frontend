import React, { useState } from "react";
import styles from "./singleStory.module.css";
import { ViewStory } from "../viewStory/ViewStory";
import NoImage from "../../assets/No-Image-Placeholder.svg.png";

export const SingleStory = ({ singleStory }) => {
  const [openViewStoryModal, setOpenViewStoryModal] = useState(false);

  return (
    <>
      <div
        className={styles.singleStory}
        onClick={() => setOpenViewStoryModal(true)}
      >
        <img
          src={
            singleStory?.post[0]?.imgUrl
              ? singleStory?.post[0]?.imgUrl
              : NoImage
          }
          alt=""
          className={styles.storyImage}
        />
        <div className={styles.dark}></div>
        <div className={styles.storyContent}>
          <h6 className={styles.storyTitle}>{singleStory?.post[0]?.heading}</h6>
          <p className={styles.storyDesc}>
            {singleStory?.post[0]?.description}
          </p>
        </div>
      </div>

      <ViewStory
        openViewStoryModal={openViewStoryModal}
        setOpenViewStoryModal={setOpenViewStoryModal}
        singleStory={singleStory}
        // storyIdTrue={true}
      />
    </>
  );
};

import React, { useEffect, useState } from "react";
import { Modal } from "@mantine/core";
import styles from "./viewStory.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaHeart, FaRegHeart, FaShare } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export const ViewStory = ({
  openViewStoryModal,
  setOpenViewStoryModal,
  storyIdTrue,
}) => {
  const searchParams = useSearchParams();
  const { storyId } = searchParams;
  if (storyId) {
    console.log(storyId);
  }

  useEffect(() => {
    if (storyIdTrue) {
      setOpenViewStoryModal(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyId]);

  // console.log(storyId);

  // if coming through story id, it means coming form a link, fetch the story here
  // create a route /viewStory/1234567, and fetch the story, if we have storyId

  const story = [
    {
      heading: "First story",
      desc: "first story description",
      imgUrl:
        "https://i.pinimg.com/474x/38/9c/ab/389cab4fab3baa1227257cd58e765237.jpg",
    },
    {
      heading: "Second Story",
      desc: "second story description",
      imgUrl:
        "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVydGljYWwlMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D",
    },
    {
      heading: "third story",
      desc: "third story description",
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1u7IwgWuPpwVyK95isXHvNR4GaRpsA-ph6I-zVoQrvA&s",
    },
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (openViewStoryModal) {
      setCurrentSlideIndex(0);
    }
  }, [openViewStoryModal]);

  const handleNextSlide = () => {
    if (currentSlideIndex < story.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };
  const handlePreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlideIndex]);
  const navigate = useNavigate();

  return (
    <>
      <Modal
        opened={openViewStoryModal}
        onClose={() => setOpenViewStoryModal(false)}
        closeOnClickOutside={false}
        withCloseButton={false}
        centered
        padding={0}
        size="sm"
        overlayProps={{
          backgroundOpacity: 0.7,
          blur: 3,
          children: [
            <FaChevronLeft
              onClick={handlePreviousSlide}
              style={{
                position: "absolute",
                top: "50%",
                left: "22%",
                color: "white",
                cursor: "pointer",
              }}
              size={55}
            />,
            <FaChevronRight
              onClick={handleNextSlide}
              style={{
                position: "absolute",
                top: "50%",
                right: "22%",
                color: "white",
                cursor: "pointer",
              }}
              size={55}
            />,
          ],
        }}
      >
        <div className={styles.story}>
          {/* <div className={styles.progressBar}>
            {story.map((s) => (
              <progress
                value={50}
                max={100}
                className={styles.progress}
                style={{ width: "100%" / story.length }}
              />
            ))}
          </div> */}

          <div className={styles.progressBarContainer}>
            {story.map((slide, index) => {
              const isCompleted = index <= currentSlideIndex;
              const isActive = index === currentSlideIndex;
              return (
                <div
                  key={index}
                  className={`${styles.progressBar} ${
                    isCompleted ? styles.progressBarCompleted : ""
                  } ${isActive ? styles.progressBarActive : ""}`}
                ></div>
              );
            })}
          </div>

          <div>
            <div
              className={styles.closeIcon}
              onClick={() => {
                setOpenViewStoryModal(false);
                navigate("/");
              }}
            >
              <IoClose size={25} />
            </div>
            <div className={styles.shareIcon}>
              <FaShare size={25} />
            </div>
          </div>

          <img
            src={story[currentSlideIndex]?.imgUrl}
            alt=""
            className={styles.storyImage}
          />

          <div>
            <h6 className={styles.title}>
              {story[currentSlideIndex]?.heading}
            </h6>
            <p className={styles.desc}>{story[currentSlideIndex]?.desc}</p>
          </div>

          <div className={styles.iconDiv}>
            <FaBookmark className={styles.bookmarkIcon} size={30} />
            <div>
              <FaRegHeart className={styles.heartIcon} size={30} />
              <p className={styles.numberOfLikes}>5</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

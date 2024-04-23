import React, { useEffect, useState } from "react";
import { Modal } from "@mantine/core";
import styles from "./viewStory.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaHeart, FaRegHeart, FaShare } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import newRequest from "../../utils/newRequest";

export const ViewStory = ({
  openViewStoryModal,
  setOpenViewStoryModal,
  storyIdTrue,
  singleStory,
}) => {
  const searchParams = useParams();
  const { storyId } = searchParams;

  const [story, setStory] = useState(singleStory);

  useEffect(() => {
    if (storyId) {
      const fetchStory = async () => {
        try {
          const res = await newRequest.get(`/post/${storyId}`);
          setStory(res?.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchStory();
    }
  }, [storyId]);

  useEffect(() => {
    if (storyIdTrue) {
      setOpenViewStoryModal(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyId]);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (openViewStoryModal) {
      setCurrentSlideIndex(0);
    }
  }, [openViewStoryModal]);

  const handleNextSlide = () => {
    if (currentSlideIndex < story?.post.length - 1) {
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

  const handleCopyStoryLink = () => {
    navigator.clipboard.writeText(
      `http://localhost:3000/viewStory/${singleStory?._id}`
    );
    toast.success("Link copied successfully!");
  };

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
          <div className={styles.progressBarContainer}>
            {story?.post?.map((s, i) => {
              const isCompleted = i <= currentSlideIndex;
              const isActive = i === currentSlideIndex;
              return (
                <div
                  key={i}
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
            <div className={styles.shareIcon} onClick={handleCopyStoryLink}>
              <FaShare size={25} />
            </div>
          </div>

          <img
            src={story?.post[currentSlideIndex]?.imgUrl}
            alt=""
            className={styles.storyImage}
          />

          <div>
            <h6 className={styles.title}>
              {story?.post[currentSlideIndex]?.heading}
            </h6>
            <p className={styles.desc}>
              {story?.post[currentSlideIndex]?.description}
            </p>
          </div>

          <div className={styles.iconDiv}>
            <FaBookmark className={styles.bookmarkIcon} size={30} />
            <div>
              <FaRegHeart className={styles.heartIcon} size={30} />
              <p className={styles.numberOfLikes}>{story?.likes.length}</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

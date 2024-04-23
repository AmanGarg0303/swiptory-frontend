import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./addStoryModal.module.css";
import modalCloseIcon from "../../../assets/modalCloseIcon.jpg";
import { Modal } from "@mantine/core";
import newRequest from "../../../utils/newRequest";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Slide = (props) => (
  <div className={styles.slideContainer}>
    <p className={styles.heading}>Add upto 6 slides</p>
    <div className={styles.allSlides}>
      {[...Array(props.slideCount)].map((_, index) => (
        <div
          key={index}
          onClick={() => props.handleSlideClick(index + 1)}
          style={{
            border:
              index + 1 === props.activeSlideIndex
                ? "2px solid #73ABFF"
                : "2px solid transparent",
          }}
          className={styles.slideNumber}
        >
          Slide {index + 1}
          {props.activeSlideIndex === index + 1 && (
            <img
              onClick={async () => {
                if (index + 1 === props.slideCount) {
                  await props.handleSlideClick(index + 1);
                  props.handleDeleteSlide(index + 1);
                } else {
                  props.handleDeleteSlide(index + 1);
                }
              }}
              className={styles.modalCloseIcon}
              src={modalCloseIcon}
              alt="modal-close-icon"
            />
          )}
        </div>
      ))}
      {props.slideCount < 6 && (
        <div
          onClick={() => {
            props.handleAddSlide();
          }}
          className={styles.addSlide}
        >
          Add +
        </div>
      )}
    </div>
  </div>
);

const Form = (props) => {
  if (props.activeSlideIndex > props.postData.slides.length) {
    return null;
  }

  return (
    <div className={styles.formContainer}>
      <div>
        <label>Heading:</label>
        <input
          onChange={(e) => {
            props.handleHeadingChange(props.activeSlideIndex, e.target.value);
          }}
          value={props.postData.slides[props.activeSlideIndex - 1].heading}
          type="text"
          placeholder="Your heading"
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          onChange={(e) => {
            props.handleDescriptionChange(
              props.activeSlideIndex,
              e.target.value
            );
          }}
          value={props.postData.slides[props.activeSlideIndex - 1].description}
          placeholder="Story description"
        ></textarea>
      </div>
      <div>
        <label>Image:</label>
        <input
          onChange={(e) => {
            props.handleImageChange(props.activeSlideIndex, e.target.value);
          }}
          value={props.postData.slides[props.activeSlideIndex - 1].imgUrl}
          type="text"
          placeholder="Add Image url"
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          onChange={(e) => {
            props.handleCategoryChange(props.activeSlideIndex, e.target.value);
          }}
          value={props.postData.slides[props.activeSlideIndex - 1].category}
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="health">Health and Fitness</option>
          <option value="travel">Travel</option>
          <option value="movies">Movies</option>
          <option value="education">Education</option>
        </select>
      </div>
    </div>
  );
};

const AddStory = ({ openCreateStoryModal, setOpenCreateStoryModal }) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [activeSlideIndex, setActiveSlideIndex] = useState(1);
  const [slideCount, setSlideCount] = useState(3);
  const [postData, setPostData] = useState({
    slides: [
      {
        heading: "",
        description: "",
        imgUrl: "",
        category: "",
      },
      {
        heading: "",
        description: "",
        imgUrl: "",
        category: "",
      },
      {
        heading: "",
        description: "",
        imgUrl: "",
        category: "",
      },
    ],
  });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleAddSlide = () => {
    setSlideCount(slideCount + 1);
    setActiveSlideIndex(slideCount + 1);
    const newPostData = { ...postData };
    newPostData.slides.push({
      heading: "",
      description: "",
      imgUrl: "",
      category: "",
    });
    setPostData(newPostData);
    if (slideCount >= 3) {
      setShowError(false);
      setErrorMessage("");
    }
  };

  const handleSlideClick = (index) => {
    setActiveSlideIndex(index);
  };

  const handleHeadingChange = (index, value) => {
    const newPostData = { ...postData };
    newPostData.slides[index - 1].heading = value;
    setPostData(newPostData);
  };

  const handleDescriptionChange = (index, value) => {
    const newPostData = { ...postData };
    newPostData.slides[index - 1].description = value;
    setPostData(newPostData);
  };

  const handleImageChange = (index, value) => {
    const newPostData = { ...postData };
    newPostData.slides[index - 1].imgUrl = value;
    setPostData(newPostData);
  };

  const handleCategoryChange = (index, value) => {
    const newPostData = { ...postData };

    const modifiedPostData = newPostData.slides.reduce((acc, obj) => {
      const modifiedObj = { ...obj, category: value };
      acc.push(modifiedObj);
      return acc;
    }, []);

    setPostData({ slides: modifiedPostData });
  };

  const handleDeleteSlide = (index) => {
    if (slideCount === 3) {
      setShowError(true);
      setErrorMessage("You need to have at least 3 slides");
      return;
    }
    if (index === postData.slides.length) {
      setActiveSlideIndex(index - 1);
    }

    const newPostData = { ...postData };
    newPostData.slides.splice(index - 1, 1);

    if (index === activeSlideIndex) {
      setActiveSlideIndex(Math.max(index - 1, 1));
    } else if (index < activeSlideIndex) {
      setActiveSlideIndex(activeSlideIndex - 1);
    }

    setSlideCount(slideCount - 1);
    setPostData(newPostData);
  };

  const [inProcess, setInProcess] = useState(false);

  const handlePost = async () => {
    const error = postData.slides.some(
      (slide) =>
        slide.heading === "" ||
        slide.description === "" ||
        slide.imgUrl === "" ||
        slide.category === ""
    );

    if (slideCount < 3) {
      setShowError(true);
      setErrorMessage("You need to have atleast 3 slides.");
      return;
    }

    if (error) {
      setShowError(true);
      setErrorMessage("Please fill all the fields.");
      return;
    }

    setShowError(false);
    setErrorMessage("");

    setInProcess(true);
    try {
      const dataToSend = {
        post: postData.slides,
        category: postData.slides[0].category,
      };

      const res = await newRequest.post(`/post/`, dataToSend);

      console.log(res.data);
      toast.success(res?.data?.message);
      setOpenCreateStoryModal(false);
    } catch (error) {
      setShowError(true);
      console.log(error);
      setErrorMessage("Something went wrong!");
    } finally {
      setInProcess(false);
    }
  };

  return (
    <Modal
      opened={openCreateStoryModal}
      onClose={() => setOpenCreateStoryModal(false)}
      closeOnClickOutside
      withCloseButton={false}
      centered
      size="lg"
    >
      {showSuccessMessage ? (
        <h1 className={styles.formHeader}>
          {id ? "Post updated successfully." : "Post created successfully."}
        </h1>
      ) : (
        <>
          <img
            src={modalCloseIcon}
            alt=""
            className={styles.modalCloseIcon}
            onClick={() => setOpenCreateStoryModal(false)}
          />
          <Slide
            slideCount={slideCount}
            activeSlideIndex={activeSlideIndex}
            handleSlideClick={handleSlideClick}
            handleAddSlide={handleAddSlide}
            handleDeleteSlide={handleDeleteSlide}
          />
          <Form
            postData={postData}
            activeSlideIndex={activeSlideIndex}
            handleHeadingChange={handleHeadingChange}
            handleDescriptionChange={handleDescriptionChange}
            handleImageChange={handleImageChange}
            handleCategoryChange={handleCategoryChange}
          />
          {showError && <div className={styles.error}>{errorMessage}</div>}
          <div className={styles.btnContainer}>
            <div className={styles.leftBtnContainer}>
              <button
                onClick={() => {
                  setActiveSlideIndex(activeSlideIndex - 1);
                  if (activeSlideIndex === 1) {
                    setActiveSlideIndex(1);
                  }
                }}
                className={styles.prevBtn}
              >
                Previous
              </button>
              <button
                onClick={() => {
                  setActiveSlideIndex(activeSlideIndex + 1);
                  if (activeSlideIndex === slideCount) {
                    setActiveSlideIndex(slideCount);
                  }
                }}
                className={styles.nextBtn}
              >
                Next
              </button>
            </div>
            <div>
              {id ? (
                <button className={styles.postBtn}>Update</button>
              ) : (
                <button
                  disabled={inProcess}
                  className={styles.postBtn}
                  onClick={handlePost}
                >
                  {inProcess ? (
                    <AiOutlineLoading3Quarters className={styles.loadingIcon} />
                  ) : (
                    "Post"
                  )}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default AddStory;

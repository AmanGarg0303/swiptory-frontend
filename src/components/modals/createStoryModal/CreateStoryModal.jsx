import { Modal } from "@mantine/core";
import styles from "./createStoryModal.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";

export const CreateStoryModal = ({
  openCreateStoryModal,
  setOpenCreateStoryModal,
}) => {
  const [slides, setSlides] = useState(3);
  const [activeSlide, setActiveSlide] = useState(1);

  const changeSlideCount = () => {
    setSlides((prev) => prev + 1);
  };

  const removeSlideFromSlides = (i) => {
    setSlides((prev) => prev - 1);

    if (activeSlide === i) {
      setActiveSlide(1);
    }
  };

  const changeActiveSlide = (dir) => {
    if (dir === "prev" && activeSlide > 1 && activeSlide <= slides) {
      setActiveSlide((prev) => prev - 1);
    }
    if (dir === "next" && activeSlide < 6 && activeSlide < slides) {
      setActiveSlide((prev) => prev + 1);
    }
  };

  const [heading, setHeading] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [imgurl, setImgurl] = useState("");

  const [story, setStory] = useState([{}]);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const story = stories[activeSlide - 1];
    // console.log(story);
    const newStory = {
      heading,
      desc,
      imgurl,
      category,
    };
    if (story) {
      setCategory(story.category);
      setDesc(story.description);
      setHeading(story.heading);
      setImgurl(story.image);
    } else {
      stories.push(newStory);
    }
  }, [activeSlide, stories]);

  console.log(stories);

  return (
    <Modal
      opened={openCreateStoryModal}
      onClose={() => setOpenCreateStoryModal(false)}
      closeOnClickOutside
      withCloseButton={false}
      centered
    >
      <IoIosCloseCircleOutline
        className={styles.closeBtn}
        onClick={() => setOpenCreateStoryModal(false)}
        size={30}
      />

      <div className={styles.slides}>
        <p
          style={{
            textAlign: "end",
            fontSize: "12px",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          Add upto 6 slides
        </p>
        <div className={styles.slideBoxes}>
          {Array(slides)
            .fill(null)
            .map((_, i) => (
              <div
                className={styles.slideBox}
                key={i}
                style={{ border: activeSlide === i + 1 && "2px solid #73aafe" }}
                onClick={() => setActiveSlide(i + 1)}
              >
                <p>Slide {i + 1}</p>

                {i >= 3 && (
                  <IoIosCloseCircleOutline
                    onClickCapture={() => removeSlideFromSlides(i + 1)}
                    className={styles.slideCross}
                    size={15}
                  />
                )}
              </div>
            ))}

          {slides < 6 && (
            <div onClick={changeSlideCount} className={styles.slideBox}>
              Add +
            </div>
          )}
        </div>
      </div>

      <form className={styles.form}>
        <div className={styles.formDivs}>
          <label htmlFor="heading">Heading:</label>
          <input
            type="text"
            id="heading"
            placeholder="Your Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>

        <div className={styles.formDivs}>
          <label htmlFor="desc">Description:</label>
          <textarea
            type="text"
            id="desc"
            placeholder="Story Description"
            rows={3}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className={styles.formDivs}>
          <label htmlFor="img">Image:</label>
          <input
            type="text"
            id="img"
            placeholder="Add Image Url"
            value={imgurl}
            onChange={(e) => setImgurl(e.target.value)}
          />
        </div>

        <div className={styles.formDivs}>
          <label htmlFor="category">Category:</label>
          <select
            name=""
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="health">Health and Fitness</option>
            <option value="travel">Travel</option>
            <option value="movies">Movies</option>
            <option value="education">Education</option>
          </select>
        </div>

        <div className={styles.btns}>
          <div className={styles.changeSlideBtns}>
            <button
              onClick={() => changeActiveSlide("prev")}
              className={styles.prev}
              type="button"
            >
              Previous
            </button>
            <button
              onClick={() => changeActiveSlide("next")}
              className={styles.next}
              type="button"
            >
              Next
            </button>
          </div>

          <div>
            <button className={styles.post}>Post</button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

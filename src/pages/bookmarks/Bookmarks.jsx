import React from "react";
import styles from "./bookmarks.module.css";
import { Stories } from "../../components/stories/Stories";

const Bookmarks = () => {
  const story = [
    {
      post: [
        {
          heading: "Eiffel Tower",
          description: "The Eiffel Tower in paris, France",
          imgUrl:
            "https://media.cntraveler.com/photos/58de89946c3567139f9b6cca/1:1/w_3633,h_3633,c_limit/GettyImages-468366251.jpg",
          category: "travel",
        },
        {
          heading: "Leaning Tower of Pisa",
          description: "Leaning tower of pisa, Rome, Italy",
          imgUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Italy_-_Pisa_-_Leaning_Tower.jpg/1200px-Italy_-_Pisa_-_Leaning_Tower.jpg",
          category: "travel",
        },
        {
          heading: "Status of liberty",
          description: "Statue of liberty, USA",
          imgUrl:
            "https://cdn.britannica.com/71/99571-050-DFF0A6E5/Statue-of-Liberty-Island-New-York.jpg",
          category: "travel",
        },
      ],
      likes: [],
      category: "travel",
      _id: "662682e5c36a34a908bcba92",
      userId: "66250b0c21082b301474101c",
    },
    // {
    //   post: [
    //     {
    //       heading: "Eiffel Tower",
    //       description: "The Eiffel Tower in paris, France",
    //       imgUrl:
    //         "https://media.cntraveler.com/photos/58de89946c3567139f9b6cca/1:1/w_3633,h_3633,c_limit/GettyImages-468366251.jpg",
    //       category: "travel",
    //     },
    //     {
    //       heading: "Leaning Tower of Pisa",
    //       description: "Leaning tower of pisa, Rome, Italy",
    //       imgUrl:
    //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Italy_-_Pisa_-_Leaning_Tower.jpg/1200px-Italy_-_Pisa_-_Leaning_Tower.jpg",
    //       category: "travel",
    //     },
    //     {
    //       heading: "Status of liberty",
    //       description: "Statue of liberty, USA",
    //       imgUrl:
    //         "https://cdn.britannica.com/71/99571-050-DFF0A6E5/Statue-of-Liberty-Island-New-York.jpg",
    //       category: "travel",
    //     },
    //   ],
    //   likes: [],
    //   category: "travel",
    //   _id: "662682e5c36a34a908bcba94",
    //   userId: "66250b0c21082b301474101c",
    // },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.stories}>
        <h4 className={styles.heading}>Your Bookmarks</h4>
        <Stories story={story} />
        <button className={styles.seeMoreBtn}>See More</button>
      </div>
    </div>
  );
};

export default Bookmarks;

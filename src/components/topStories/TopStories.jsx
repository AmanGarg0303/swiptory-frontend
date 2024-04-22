import React, { useState } from "react";
import styles from "./topStories.module.css";
import { Category } from "../category/Category";
import { categoryData } from "../../utils/cardsData";

export const TopStories = () => {
  const [data, setData] = useState([]);
  const api = async () => {};

  return (
    <div className={styles.container}>
      {categoryData.map((card) => (
        <Category name={card.categoryName} key={card.id} />
      ))}
    </div>
  );
};

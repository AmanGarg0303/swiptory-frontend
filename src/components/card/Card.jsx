import React from "react";
import styles from "./card.module.css";

export const Card = ({ category }) => {
  return (
    <div className={styles.card}>
      <img
        src={category.img}
        alt={category.categoryName}
        className={styles.cardImg}
      />
      <h4 className={styles.catName}>{category.categoryName}</h4>
    </div>
  );
};

import React from "react";
import styles from "./cards.module.css";
import { Card } from "../card/Card";
import { categoryData } from "../../utils/cardsData";

export const Cards = () => {
  const allCard = {
    id: "6",
    categoryName: "All",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_5qL45U5p--LP_0J5hZTR0D4PWdftpeJ1z2HyLRE-g&s",
  };

  return (
    <div className={styles.container}>
      <Card category={allCard} />

      {categoryData?.map((category) => (
        <Card key={category.id} category={category} />
      ))}
    </div>
  );
};

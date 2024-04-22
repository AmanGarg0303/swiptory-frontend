import styles from "./topStories.module.css";
import { Category } from "../category/Category";
import { categoryData } from "../../utils/cardsData";

export const TopStories = () => {
  return (
    <div className={styles.container}>
      {categoryData.map((card) => (
        <Category name={card.categoryName} key={card.id} />
      ))}
    </div>
  );
};

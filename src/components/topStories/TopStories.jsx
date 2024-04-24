import styles from "./topStories.module.css";
import { Category } from "../category/Category";
import { categoryData } from "../../utils/cardsData";
import { useActiveFilter } from "../../providers/activeFilterProvider";
import YourStories from "../../pages/yourStories/YourStories";
import { useSelector } from "react-redux";

export const TopStories = () => {
  const { activeFilter } = useActiveFilter();

  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className={styles.container}>
      {currentUser && <YourStories />}

      {categoryData.map(
        (card) =>
          card.categoryName !== "All" &&
          activeFilter === "All" && (
            <Category name={card.categoryName} key={card.id} />
          )
      )}

      {categoryData.map(
        (card) =>
          card.categoryName !== "All" &&
          card.categoryName === activeFilter && (
            <Category name={card.categoryName} key={card.id} />
          )
      )}
    </div>
  );
};

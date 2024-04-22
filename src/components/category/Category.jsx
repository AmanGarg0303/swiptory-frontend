import React, { useEffect, useState } from "react";
import styles from "./category.module.css";
import { Stories } from "../stories/Stories";
import getPostsByCat from "../../api/getPostsByCat";

export const Category = ({ name }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchD = async () => {
      const d = await getPostsByCat(name);
      setData(d?.data);
    };

    fetchD();
  }, [name]);

  // console.log(data);

  return (
    <div className={styles.story}>
      <h4 className={styles.storyCat}>Top Stories about {name}</h4>
      <Stories story={data} />
      <button className={styles.seeMoreBtn}>See More</button>
    </div>
  );
};

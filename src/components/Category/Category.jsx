import React, { useState } from 'react';
import styles from './Category.module.scss';
import AppContext from '../../hooks/Context';

const Category = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const { pizzas, setCategoryValue, setPage } = React.useContext(AppContext);

  const handleClickCategory = (item, num) => {
    setActiveIndex(num);
    setPage(1);
    setCategoryValue(num);
  };

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className={styles.content}>
      <div className={styles.categories}>
        <ul>
          {categories &&
            categories.map((item, index) => {
              return (
                <li
                  onClick={() => handleClickCategory(item, index)}
                  key={index}
                  className={`${activeIndex === index ? styles.active : ''}`}
                >
                  {item}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Category;

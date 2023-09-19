import React, { useState } from 'react';
import './Category.scss';

const Category = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleClickCategory = (num) => {
    setActiveIndex(num);
  };

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="content__top">
      <div className="categories">
        <ul>
          {categories &&
            categories.map((item, index) => {
              return (
                <li
                  onClick={() => handleClickCategory(index)}
                  key={index}
                  className={`${activeIndex === index ? 'active' : ''}`}
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

import React, { useState } from 'react';
import styles from './Category.module.scss';
import AppContext from '../../hooks/Context';
import {useDispatch} from "react-redux";
import {changeCategory} from "../../store/reducers/categorySlice.ts";
import {setPage} from "../../store/reducers/pageSlice.ts";
import {useAppSelector} from "../../hooks/redux.ts";

const Category = () => {
  const dispatch = useDispatch()
  const {categoryValue} = useAppSelector(state => state.categorySlice)

  const handleClickCategory = (num: number) => {
    dispatch(changeCategory(num))
    dispatch(setPage(1))
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
                  onClick={() => handleClickCategory(index)}
                  key={index}
                  className={`${categoryValue === index ? styles.active : ''}`}
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

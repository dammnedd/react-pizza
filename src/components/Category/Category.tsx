import React, {memo, useState} from 'react';
import styles from './Category.module.scss';
import {useDispatch} from "react-redux";
import {changeCategory} from "../../store/reducers/categorySlice.ts";
import {setPage} from "../../store/reducers/pageSlice.ts";
import {useAppSelector} from "../../hooks/redux.ts";

const Category = memo(() => {
  const dispatch = useDispatch()
  const {categoryValue} = useAppSelector(state => state.categorySlice)

  const handleClickCategory = React.useCallback((num: React.MouseEvent<HTMLLIElement>) => {
    dispatch(changeCategory(num))
    dispatch(setPage(1))
  }, []);

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
})

export default Category;

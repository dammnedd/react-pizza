import React from 'react';
import styles from './Home.module.scss';
import Sort from '../../components/Sort/Sort.tsx';
import Category from '../../components/Category/Category.tsx';
import PizzaBlock from '../../components/PizzaBlock/PizzaBlock.tsx';
import Skeleton from '../../components/Skeleton/Skeleton';
import AppContext from '../../hooks/Context';
import Pagination from '../../components/Pagination/Pagination.tsx';
import {useAppSelector} from "../../hooks/redux.ts";

const Home: React.FC = () => {
  const {pizzas} = useAppSelector(state => state.mainSlice)
    const { isLoading } = useAppSelector(state => state.pageSlice)

  return (
    <>
      <div className={styles.top}>
        <Category />
        <Sort />
      </div>
      <h2 className={styles.title}>Все пиццы</h2>
      <div className={styles.items}>
        {isLoading
          ? [...new Array(6)].map((_, index) => {
              return <Skeleton key={index} />;
            })
          : pizzas &&
            pizzas
              // .filter((item) => item.title.toLowerCase().includes(searchValue))
              .map((item, index: number) => {
                return <PizzaBlock {...item} key={index} />;
              })}
      </div>
      <Pagination />
    </>
  );
};

export default Home;

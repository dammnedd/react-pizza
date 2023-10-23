import React from 'react';
import styles from './Home.module.scss';
import Sort from '../../components/Sort/Sort.tsx';
import Category from '../../components/Category/Category.tsx';
import PizzaBlock from '../../components/PizzaBlock/PizzaBlock';
import Skeleton from '../../components/Skeleton/Skeleton';
import AppContext from '../../hooks/Context';
import Pagination from '../../components/Pagination/Pagination.tsx';

const Home = () => {
  const { pizzas, isLoading, searchValue } = React.useContext(AppContext);

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
              .map((item, index) => {
                return <PizzaBlock {...item} key={index} />;
              })}
      </div>
      <Pagination />
    </>
  );
};

export default Home;

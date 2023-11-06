import React from 'react';
import styles from './Home.module.scss';
import Sort from '../../components/Sort/Sort.tsx';
import Category from '../../components/Category/Category.tsx';
import PizzaBlock from '../../components/PizzaBlock/PizzaBlock.tsx';
import Skeleton from '../../components/Skeleton/Skeleton';
import AppContext from '../../hooks/Context';
import Pagination from '../../components/Pagination/Pagination.tsx';
import {useAppSelector} from "../../hooks/redux.ts";
import {pizzaItem} from "../../types/main.ts";
import {fetchPizza} from "../../store/services/pizzaService.ts";
import {paramsCategory, paramsTypes} from "../../types/params";
import category from "../../components/Category/Category.tsx";


const Home: React.FC = () => {
  const {pizzas} = useAppSelector(state => state.mainSlice)
    // const { isLoading } = useAppSelector(state => state.pageSlice)

    const { type, sortProperty } = useAppSelector((state) => state.SortSlice.sort)
    const { page, limit } = useAppSelector(state => state.pageSlice)
    const { categoryValue } = useAppSelector(state => state.categorySlice)
    const { searchValue } = useAppSelector(state => state.mainSlice)

    const params: paramsTypes = {type, sortProperty, page, limit, searchValue, categoryValue}

    const {data: allPizzas, isLoading, error} = fetchPizza.useFetchAllPizzasQuery(params, {})



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
          : allPizzas &&
            allPizzas
              // .filter((item) => item.title.toLowerCase().includes(searchValue))
              .map((item: pizzaItem, index: number) => {
                return <PizzaBlock {...item} key={index} />;
              })}
      </div>
        {
            error &&
            <h1 className={styles.error}>
                Не удалось загрузить пиццы, попробуйте снова 😔
            </h1>
        }
      <Pagination />
    </>
  );
};

export default Home;

import React, {useEffect} from 'react';
import styles from './Home.module.scss';
import Sort from '../../components/Sort/Sort.tsx';
import Category from '../../components/Category/Category.tsx';
import PizzaBlock from '../../components/PizzaBlock/PizzaBlock.tsx';
import Skeleton from '../../components/Skeleton/Skeleton.tsx';
import Pagination from '../../components/Pagination/Pagination.tsx';
import {useAppSelector} from "../../hooks/redux.ts";
import {pizzaItem} from "../../types/main.ts";
import {fetchPizza} from "../../store/services/pizzaService.ts";
import {paramsTypes} from "../../types/params";
import {useDispatch} from "react-redux";
import {setPageQuantity} from "../../store/reducers/pageSlice.ts";
import {setIsCart} from "../../store/reducers/mainSlice.ts";
import {setPizzas} from "../../store/reducers/mainSlice.ts";
import {fetchCart} from "../../store/services/cartService.ts";
import {setCart} from "../../store/reducers/cartSlice.ts";

const Home: React.FC = () => {
  const {type, sortProperty} = useAppSelector((state) => state.SortSlice.sort)
  const {page, limit} = useAppSelector(state => state.pageSlice)
  const {categoryValue} = useAppSelector(state => state.categorySlice)
  const {searchValue} = useAppSelector(state => state.mainSlice)
  const dispatch = useDispatch()

  const params: paramsTypes = {type, sortProperty, page, limit, searchValue, categoryValue}
  const {data: allPizzas, isError: isErrorAllPizzas} = fetchPizza.useFetchAllPizzasQuery()
  const {data: somePizzas, isLoading, error} = fetchPizza.useFetchSomePizzasQuery(params, {})
  const {data: pizzasWithoutLimit, isError: isErrorWithoutLimit} = fetchPizza.useFetchWithoutLimitQuery({
    type,
    sortProperty,
    searchValue,
    categoryValue
  })
  const {data: cartData, isLoading: isLoadingCart, isError: isErrorCart} = fetchCart.useGetCartQuery()

  useEffect(() => {
    dispatch(setIsCart(false))
  }, []);

  useEffect(() => {
    if (cartData) {
      dispatch(setCart(cartData))
    }
  }, [cartData]);

  useEffect(() => {
    if (categoryValue === 0 && allPizzas) {
      dispatch(setPageQuantity(Math.ceil(allPizzas.length / limit)))
      dispatch(setPizzas(allPizzas))
    } else if (somePizzas && categoryValue != 0) {
      dispatch(setPageQuantity(Math.ceil(pizzasWithoutLimit.length / limit)))
    }
  }, [allPizzas, somePizzas]);

  return (
    <>
      <div className={styles.top}>
        <Category/>
        <Sort/>
      </div>
      <h2 className={styles.title}>Все пиццы</h2>
      <div className={styles.items}>
        {isLoading
          ? [...new Array(6)].map((_, index) => {
            return <Skeleton key={index}/>;
          })
          : somePizzas &&
          somePizzas
            // .filter((item) => item.title.toLowerCase().includes(searchValue))
            .map((item: pizzaItem, index: number) => {
              return <PizzaBlock {...item} key={index}/>;
            })}
      </div>
      {
        (error || isErrorAllPizzas || isErrorWithoutLimit) &&
          <h1 className={styles.error}>
              Не удалось загрузить пиццы, попробуйте снова 😔
          </h1>
      }
      <Pagination/>
    </>
  );
};

export default Home;

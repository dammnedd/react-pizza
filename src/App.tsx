import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header.tsx';
import styles from './scss/app.module.scss';
import axios from 'axios';
import Home from './pages/Home/Home.tsx';
import AppContext from './hooks/Context';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import Cart from './pages/Cart/Cart.tsx';
import {useAppSelector} from "./hooks/redux.ts";
import {setPageQuantity, setIsLoading} from "./store/reducers/pageSlice.ts";
import {setPizzas} from "./store/reducers/mainSlice.ts";
import {useDispatch} from "react-redux";


export const BASE_URL = 'https://650ab658dfd73d1fab08bf7a.mockapi.io/pizzas';


const App: React.FC = () => {
  const { page, limit } = useAppSelector(state => state.pageSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get(BASE_URL).then(({ data }) => {
          dispatch(setPageQuantity(Math.ceil(data.length / limit)))
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();

  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${BASE_URL}?${
  //           categoryValue !== 0
  //             ? `category=${categoryValue}&sortBy=${sortProperty}&order=${type}&search=${searchValue}&page=${page}&limit=${limit}`
  //             : `sortBy=${sortProperty}&order=${type}&search=${searchValue}&page=${page}&limit=${limit}`
  //         }`,
  //       );
  //       dispatch(setPizzas(response.data))
  //       dispatch(setIsLoading(false))
  //       console.log(response.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   // fetchData();
  //   // dispatch(setIsLoading(true))
  // }, [categoryValue, name, searchValue, page]);

  return (
    <AppContext.Provider
      value={{

      }}
    >
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.content}>
          <div className={styles.container}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;

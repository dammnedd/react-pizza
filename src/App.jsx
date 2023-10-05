import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import styles from './scss/app.module.scss';
import axios from 'axios';
import Home from './pages/Home/Home';
import AppContext from './hooks/Context';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import Cart from './pages/Cart/Cart';

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryValue, setCategoryValue] = useState(0);
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const [limit] = useState(6);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sort: 'rating',
  });
  const [searchValue, setSearchValue] = useState('');
  const BASE_URL = 'https://650ab658dfd73d1fab08bf7a.mockapi.io/pizzas?';

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get(BASE_URL).then(({ data }) => {
          setPageQty(Math.ceil(data.length / limit));
          console.log(pageQty);
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}${
            categoryValue !== 0
              ? `category=${categoryValue}&sortBy=${sortType.sort}&order=${sortType.type}&search=${searchValue}&page=${page}&limit=${limit}`
              : `sortBy=${sortType.sort}&order=${sortType.type}&search=${searchValue}&page=${page}&limit=${limit}`
          }`,
        );
        setPizzas(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    setIsLoading(true);
  }, [categoryValue, sortType, searchValue, page]);

  return (
    <AppContext.Provider
      value={{
        pizzas,
        isLoading,
        setCategoryValue,
        setSortType,
        setSearchValue,
        searchValue,
        page,
        setPage,
        pageQty,
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

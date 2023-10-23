import React, { useContext } from 'react';
import styles from './Pagination.module.scss';
import {useAppSelector} from "../../hooks/redux.ts";
import {useDispatch} from "react-redux";
import {setPage, setPageQuantity, changePageValue} from "../../store/reducers/pageSlice.ts";

const Pagination: React.FC = () => {
  const { page, pageQuantity} = useAppSelector(state => state.pageSlice)
  const dispatch = useDispatch()

  const handleClickLeft = () => {
    if (page !== 1) {
      dispatch(changePageValue(1))
    }
  };

  const handleClickRight = () => {
    dispatch(changePageValue(-1))
  };

  const changePage = (num: number) => {
    dispatch(setPage(num))
  };

  return (
    <div className={styles.container}>
      <ul className={styles.pagination}>
        <li onClick={() => handleClickLeft()}>←</li>
        {page > 2 ? <li onClick={() => changePage(1)}>1</li> : ''}
        {page > 4 ? <li className={styles.noStyle}>...</li> : ''}
        {page > 3 ? <li onClick={() => changePage(page - 1)}>{page - 2}</li> : ''}
        {page !== 1 ? <li onClick={() => changePage(page - 1)}>{page - 1}</li> : ''}
        <li className={styles.active}>{page}</li>
        {page < pageQuantity - 1 ? <li onClick={() => changePage(page + 1)}>{page + 1}</li> : ''}
        {page < pageQuantity - 2 ? <li onClick={() => changePage(page + 2)}>{page + 2}</li> : ''}
        {page < pageQuantity - 3 ? <li className={styles.noStyle}>...</li> : ''}
        {page !== pageQuantity ? <li onClick={() => changePage(pageQuantity)}>{pageQuantity}</li> : ''}
        <li onClick={() => handleClickRight()}>→</li>
      </ul>
    </div>
  );
};

export default Pagination;

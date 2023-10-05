import { useContext } from 'react';
import styles from './Pagination.module.scss';
import AppContext from '../../hooks/Context';

const Pagination = () => {
  const { page, setPage, pageQty } = useContext(AppContext);

  const handleClickLeft = () => {
    if (page !== 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleClickRight = () => {
    setPage((prev) => prev + 1);
  };

  const changePage = (num) => {
    setPage(num);
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
        {page < pageQty - 1 ? <li onClick={() => changePage(page + 1)}>{page + 1}</li> : ''}
        {page < pageQty - 2 ? <li onClick={() => changePage(page + 2)}>{page + 2}</li> : ''}
        {page < pageQty - 3 ? <li className={styles.noStyle}>...</li> : ''}
        {page !== pageQty ? <li onClick={() => changePage(pageQty)}>{pageQty}</li> : ''}
        <li onClick={() => handleClickRight()}>→</li>
      </ul>
    </div>
  );
};

export default Pagination;

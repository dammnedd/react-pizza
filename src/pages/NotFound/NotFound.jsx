import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.title}>404</h1>
      <span className={styles.desc}>Страница не найдена</span>
      <Link to="/">
        <button className={styles.button}>Вернуться назад</button>
      </Link>
    </div>
  );
};

export default NotFound;

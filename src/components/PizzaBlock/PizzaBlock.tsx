import React from 'react';
import styles from './PizzaBlock.module.scss';
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../hooks/redux.ts";
import {pizzaItem} from "../../types/main";

const PizzaBlock: React.FC<pizzaItem> = ({ imageUrl, title, types, sizes, price, category, rating }) => {
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const dispatch = useDispatch()


  const typeNames = ['тонкое', 'традиционное'];



  return (
    <div className={styles.pizzaBlock}>
      <img className={styles.image} src={imageUrl} alt="Pizza" />
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.selector}>
        <ul>
          {types &&
            types.map((item: number, index: number) => {
              return (
                <li
                  onClick={() => setActiveType(index)}
                  className={`${activeType === index ? styles.activeType : ''}`}
                  key={index}
                >
                  {typeNames[item]}
                </li>
              );
            })}
        </ul>
        <ul>
          {sizes &&
            sizes.map((item: number, index: number) => {
              return (
                <li
                  onClick={() => setActiveSize(index)}
                  className={`${activeSize === index ? styles.activeType : ''}`}
                  key={index}
                >
                  {item} см.
                </li>
              );
            })}
        </ul>
      </div>
      <div className={styles.bottom}>
        <div className={styles.price}>от {price} ₽</div>
        <button className={styles.button}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="#fff"
            />
          </svg>
          <span>Добавить</span>
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;

import React, {useEffect, useState} from 'react';
import styles from './PizzaBlock.module.scss';
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../hooks/redux.ts";
import {pizzaItem} from "../../types/main";
import {fetchCart} from "../../store/services/cartService.ts";

const PizzaBlock: React.FC<pizzaItem> = ({ imageUrl, title, types, sizes, price, id }) => {
  const typeNames = ['тонкое', 'традиционное'];
  const [activeType, setActiveType] = useState<number>(0);
  const [activeNameType, setActiveNameType] = useState<string>(typeNames[types[0]])
  const [activeSize, setActiveSize] = useState<number>(0);
  const [activeNameSize, setActiveNameSize] = useState<number>(sizes[0])
  const [buttonClicked, setButtonClicked] = useState<boolean>(false)

  const dispatch = useDispatch()
  const {pizzas} = useAppSelector(state => state.mainSlice)
  const { cartItems } = useAppSelector(state => state.cartSlice)
  const [ addToCard ] = fetchCart.useAddToCartMutation()
  const [ deleteCartItem ] = fetchCart.useDeleteCartItemMutation()

    const {page} = useAppSelector(state => state.pageSlice)

  useEffect(() => {
    const item = cartItems.find((item) => Number(item.parentId) === Number(id))
    if (item) {
      setButtonClicked(true)
    } else {
      setButtonClicked(false)
    }
    setActiveType(0)
  }, [id]);

  const handleAdd = async () => {
      setButtonClicked(!buttonClicked)
    const foundItem = cartItems.find((item) => Number(item.parentId) === Number(id))
    if (foundItem) {
      await deleteCartItem(foundItem?.id)
    } else {
      await addToCard({...pizzas[id], parentId: id, typeName: activeNameType, sizeName: activeNameSize})
    }
  }

  const handleClickType = (item: number, index: number) => {
    setActiveType(index)
    setActiveNameType(typeNames[item])
  }

  const handleClickSize = (item: number, index: number) => {
    setActiveSize(index)
    console.log(item, index)
    setActiveNameSize(item)
  }

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
                  onClick={() => handleClickType(item, index)}
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
                  onClick={() => handleClickSize(item, index)}
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
        <button onClick={handleAdd} className={[styles.button, buttonClicked ? styles.buttonActive : ''].join(' ')}>
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

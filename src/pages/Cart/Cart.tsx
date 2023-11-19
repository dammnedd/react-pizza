import React, {FC, useEffect} from 'react';
import styles from './Cart.module.scss';
import CartItem from '../../components/CartItem/CartItem.tsx';
import {useDispatch} from "react-redux";
import {setIsCart} from "../../store/reducers/mainSlice.ts";
import {fetchCart} from "../../store/services/cartService.ts";
import {setCart, setSum} from "../../store/reducers/cartSlice.ts";
import {useAppSelector} from "../../hooks/redux.ts";
import {NavLink} from "react-router-dom";

const Cart: FC = () => {
  const dispatch = useDispatch()
    const { cartItems, sumOfCart } = useAppSelector(state => state.cartSlice)
  const { data: cartData, isLoading, isError } = fetchCart.useGetCartQuery()
    // const [deleteCart] = fetchCart.useDeleteCartMutation()


  useEffect(() => {
    dispatch(setIsCart(true))
    if (cartData && cartData.length > 0) {
      dispatch(setCart(cartData))
      const cartSum = cartData.map((item) => item.price * item.quantity).reduce((acc, item) => acc + item, 0)
      dispatch(setSum(cartSum))
    }
  }, [cartData]);

  // const handleDeleteCart = async () => {
  //   await deleteCart('')
  //   // dispatch(setCart([]))
  // }


  return (
    <>
  <div className={styles.container}>
    {isLoading && <h1 className={styles.isLoading}>Идет загрузка...</h1>}
    {isError && <h1 className={styles.isLoading}>Произошла ошибка при загрузке данных корзины</h1>}

    {
      cartItems.length > 0 && !isLoading && !isError ?
          <div>
            <div className={styles.top}>
        <div className={styles.topLeft}>
          <img src="/img/basket.svg" alt="" />
          <span>Корзина</span>
        </div>
        <div className={styles.topRight}>
          <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M2.5 5H4.16667H17.5"
                stroke="#B6B6B6"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
                stroke="#B6B6B6"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.33337 9.16667V14.1667"
                stroke="#B6B6B6"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.6666 9.16667V14.1667"
                stroke="#B6B6B6"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
          </svg>

          <span>Очистить корзину</span>
        </div>
      </div>
        {
           cartItems &&
           cartItems.map((item, index) => (
               <CartItem {...item} key={index}/>
           ))
        }
      <div className={styles.bottom}>
        <div className={styles.bottomLeft}>
          <div className={styles.countPizza}>
            <span>Всего пицц:</span>
            <h5>{cartData && cartData.map((item) => item.quantity).reduce((a, b) => a + b, 0)} шт.</h5>
          </div>
            <NavLink to={'/'}>
                <button className={styles.back}>
                    <img src="/img/arrow-left.svg" alt="" />
                    Вернуться назад
                </button>
            </NavLink>
        </div>
        <div className={styles.bottomRight}>
          <div className={styles.sumPizza}>
            <span>Сумма заказа:</span>
            <h5>{sumOfCart} ₽</h5>
          </div>
          <button className={styles.pay}>Оплатить сейчас</button>
        </div>
      </div>
    </div>
      :
        cartItems.length === 0 && !isLoading && !isError ?
          <div className={styles.empty}>
            <h1 className={styles.emptyTitle}>Корзина пустая 😩</h1>
            <span className={styles.emptyDesc}>Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать пиццу, перейди на главную страницу.</span>
            <img src='/img/empty.svg' alt={'empty'}/>
              <NavLink to={'/'}>
                  <button className={styles.pay}>Вернуться назад</button>
              </NavLink>
          </div>
         : ''
    }

  </div>
    </>
  );
};

export default Cart;

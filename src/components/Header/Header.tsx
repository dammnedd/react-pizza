import React, {useEffect, useRef} from 'react';
import styles from './Header.module.scss';
import {Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../store/reducers/mainSlice.ts";
import {useAppSelector} from "../../hooks/redux.ts";
import {fetchCart} from "../../store/services/cartService.ts";
import {setSum} from "../../store/reducers/cartSlice.ts";

const Header: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch()
  const {isCart} = useAppSelector(state => state.mainSlice)
  const {sumOfCart} = useAppSelector(state => state.cartSlice)
  const {data: cartData} = fetchCart.useGetCartQuery()


  useEffect(() => {
    if (cartData) {
      const cartSum = cartData.map((item) => item.price * item.quantity).reduce((acc, item) => acc + item, 0)
      dispatch(setSum(cartSum))
    }
  }, [cartData])


  const takeSearchValue = React.useCallback(() => {
    dispatch(setSearchValue(inputRef.current.value.toLowerCase()))
  }, [])

  const debounce = (callback: React.ChangeEvent<HTMLInputElement>, ms: number) => {
    let time: NodeJS.Timeout
    return function (...args: never) {
      clearTimeout(time)
      time = setTimeout(() => callback.apply(this, args), ms)
    }
  }


  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          <div className={styles.logo}>
            <img width="38" src="./img/pizza-logo.svg" alt="Pizza logo"/>
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>

        {
          !isCart &&
            <>
                <form className={styles.search} action="/">
                    <label htmlFor="input">
                        <img src="/img/search.png" alt=""/>
                    </label>
                    <input
                        ref={inputRef}
                        id="input"
                        onChange={debounce(takeSearchValue, 1000)}
                        type="text"
                        placeholder="Поиск пиццы"
                    />
                </form>
                <Link to="/cart">
                    <div className={styles.headerCart}>
                        <span>{sumOfCart && sumOfCart} ₽</span>
                        <div className="button__delimiter"></div>
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                                stroke="white"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                                stroke="white"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                                stroke="white"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>{cartData && cartData.map((item) => item.quantity).reduce((acc, item) => acc + item, 0)}</span>
                    </div>
                </Link>
            </>
        }


      </div>
    </header>
  );
};

export default Header;




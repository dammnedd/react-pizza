import React from 'react';
import styles from './Sort.module.scss';
import AppContext from '../../hooks/Context';
import {changeSort} from "../../redux/reducers/sortSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {useAppSelector} from "../../hooks/redux.ts";

const Sort = () => {
  const [open, setOpen] = React.useState(false);
  const [mouseEntered, setMouseEntered] = React.useState(1);
  const [sortValue, setSortValue] = React.useState('популярности');
  const divRef = React.useRef(null);
  const list = [
    { name: 'популярности ↓', sort: 'rating', type: 'desc' },
    { name: 'популярности ↑', sort: 'rating', type: 'asc' },
    { name: 'цене ↓', sort: 'price', type: 'desc' },
    { name: 'цене ↑', sort: 'price', type: 'asc' },
    { name: 'алфавиту ↓', sort: 'title', type: 'desc' },
    { name: 'алфавиту ↑', sort: 'title', type: 'asc' },
  ];
  const { setSortType } = React.useContext(AppContext);
  const dispatch = useDispatch()

  const {  } = useAppSelector(state => state.)
  console.log(sort)

  React.useEffect(() => {
    document.addEventListener('click', clickOutside);

    return () => {
      document.removeEventListener('click', clickOutside);
    };
  }, []);

  const handleClickSort = (item, index) => {
    setSortValue(item.name);
    setSortType(item);
  };

  const clickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  return (
    <div ref={divRef} className={styles.sort}>
      <div onClick={() => setOpen(!open)} className={styles.label}>
        <div>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Сортировка по:</b>
        </div>
        <span>{sortValue}</span>
      </div>
      {open && (
        <div className={styles.popup}>
          <ul>
            {list &&
              list.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={`${mouseEntered === index ? 'active' : ''}`}
                    onMouseEnter={() => setMouseEntered(index)}
                    onMouseLeave={() => setMouseEntered(null)}
                    // onClick={() => handleClickSort(item, index)}
                    onClick={() => dispatch(changeSort(index))}
                  >
                    {item.name}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;

import React, {memo} from 'react';
import styles from './Sort.module.scss';
import {changeSortProperty, changeOpen, mouseEntered} from "../../store/reducers/sortSlice.ts";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../hooks/redux.ts";
import {listState} from "../../types/sort";

const Sort: React.FC = memo(() => {
  const divRef = React.useRef(null);
  const list: listState[] = [
    { name: 'популярности ↓', sort: 'rating', type: 'desc' },
    { name: 'популярности ↑', sort: 'rating', type: 'asc' },
    { name: 'цене ↓', sort: 'price', type: 'desc' },
    { name: 'цене ↑', sort: 'price', type: 'asc' },
    { name: 'алфавиту ↓', sort: 'title', type: 'desc' },
    { name: 'алфавиту ↑', sort: 'title', type: 'asc' },
  ];
  const dispatch = useDispatch()
  const { sort, open, mouseValue } = useAppSelector((state) => state.SortSlice)


  React.useEffect(() => {
    document.addEventListener('click', clickOutside);

    return () => {
      document.removeEventListener('click', clickOutside);
    };
  }, []);

  const handleClickSort = React.useCallback((item: listState) => {
    dispatch(changeSortProperty(item))
  }, [])

  const clickOutside = React.useCallback((event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      dispatch(changeOpen(false))
    }
  }, [])

  return (
    <div ref={divRef} className={styles.sort}>
      <div onClick={() => dispatch(changeOpen(!open))} className={styles.label}>
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
        <span>{sort.name}</span>
      </div>
      {open && (
        <div className={styles.popup}>
          <ul>
            {list &&
              list.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={`${mouseValue === index ? 'active' : ''}`}
                    onMouseEnter={() => mouseEntered(index)}
                    onMouseLeave={() => mouseEntered(null)}
                    onClick={() => handleClickSort(item)}
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
})

export default Sort;

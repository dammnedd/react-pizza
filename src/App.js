import Category from './components/Category/Category';
import Header from './components/Header/Header';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import Sort from './components/Sort/Sort';
import './scss/app.scss';
import pizzas from './assets/pizzas.json';

function App() {
  console.log(pizzas);
  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <div className="container">
          <div className="content__top">
            <Category />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas &&
              pizzas.map((item, index) => {
                return <PizzaBlock key={index} {...item} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import classes from './Burger.css';

import BurgerIngredient from './burgeringradient/BurgerIngredient';

const burger = (props) => {
  // max rijesenje boli glava
  let novo = Object.keys(props.ingredients).map((igKey) => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey} />;
    });
  }).reduce((prevValue,trenutnaVrijednost)=> {
    return prevValue.concat(trenutnaVrijednost)
  },[]);
  // console.log(novo);

  // if(novo.length === 0) {
  //   novo = 'Upisi neku namirnicu';  
  // }

  // Kreiram novo polje
  const novopolje = [];
  Object.keys(props.ingredients).forEach((key) => {
    for (let i = 0; i < props.ingredients[key]; i++) {
      novopolje.push([key, 1]);
    }
  });

  // crtam na ekran
  let renderDOM = novopolje.map((data, index) => {
    return <BurgerIngredient key={index} type={data[0]}></BurgerIngredient>;
  });

  if(renderDOM.length === 0) {
    renderDOM = <BurgerIngredient key={'x'} type={'prazno'}></BurgerIngredient>;  
  }


  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top'></BurgerIngredient>
      {renderDOM}
      {/* {novo} */}
      <BurgerIngredient type='bread-bottom'></BurgerIngredient>
    </div>
  );
};

export default burger;

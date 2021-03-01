import React from 'react';
import classes from './BurgerControls.css';
import BurgerCtrl from './ctrl/BurgerCtrl.js';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const burgerControls = (props) => {
  // console.log(props);

  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map((ctrl) => (
        <BurgerCtrl
          key={ctrl.label}
          label={ctrl.label}
          addedFunc={() => props.namirnicaDodana(ctrl.type)}
          removedFunc={() => props.namirnicaOduzeta(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}

      {/* Narudba */}
      <button
        className={classes.OrderButton}
        disabled={!props.mozeSeKupiti}
        onClick={props.narudbaFunc}
      >
        Naruči Order now
      </button>
    </div>
  );
};

export default burgerControls;

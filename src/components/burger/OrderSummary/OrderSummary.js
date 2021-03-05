import React from 'react';
import Auxx from '../../../layouts/Auxx';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.css';

const orderSummary = (props) => {
  console.log(props);
  const ingredientSummary = Object.keys(props.ingredients).map(key=>{
    return (
      <li key={key} className={classes.Polozaj}>
        <p> <span style={{textTransform:' capitalize'}} >{key}</span> {props.ingredients[key]}</p>
      </li>
    )
  })

  console.log('orderSummary',ingredientSummary);
  

  return (
    <Auxx className={classes.OrderSummary}>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>

      <ul> { ingredientSummary } </ul>
      <p className={classes.Polozaj} >
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button 
        btnType='Danger' 
        clicked={props.zatvoriModal}
      >
        CANCEL
      </Button>
      <Button 
        btnType='Success' 
        clicked={props.nastavakNarudbe}
      >
        NASTAVAK kupnja
      </Button>
    </Auxx>
  );
};

export default orderSummary;

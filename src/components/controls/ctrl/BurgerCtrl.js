import React from 'react'
import classes from './BurgerCtrl.css'

const BurgerCtrl = (props) => {
  
  return (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button 
            className={classes.Less} 
            onClick={props.removedFunc} 
            disabled={props.disabled}
            >Less</button>
        <button 
            className={classes.More} 
            onClick={props.addedFunc}>More</button>
    </div>
  )
}

export default BurgerCtrl

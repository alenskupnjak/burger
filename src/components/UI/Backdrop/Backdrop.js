import React from 'react'
import classes from './Backdrop.css';

const backdrop = (props) => {
  console.log(props);
  
  return (
    <div>
      { props.prikaziBackdrop ? <div className={classes.Backdrop} onClick={props.clicked}>
        Nesto
      </div> : null}
    </div>
  )
}

export default backdrop

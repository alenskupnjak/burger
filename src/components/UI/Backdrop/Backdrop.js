import React from 'react'
import classes from './Backdrop.css';

const backdrop = (props) => {
  console.log('%c backdrop', 'color:olive',props);
  
  return (
    <div>
      { props.prikaziBackdrop ? <div className={classes.Backdrop} onClick={props.clicked}> Prikazujem </div> : null}
    </div>
  )
}

export default backdrop

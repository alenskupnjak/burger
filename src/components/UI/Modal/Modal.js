import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Auxx from '../../../layouts/Auxx';

const modal = (props) => {
  console.log(props);

  return (
    <Auxx>
      {/* Pozadina */}
      <Backdrop 
        prikaziBackdrop={props.prikaziModal} 
        clicked={props.zatvoriModal} >
      </Backdrop>
      <div
        className={classes.Modal}
        style={{
          transform: props.prikaziModal
            ? 'translateY(0)'
            : 'translateY(-100vh)',
        }}
      >
        {props.children}
      </div>
    </Auxx>
  );
};

export default modal;

import React from 'react';

import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxx from '../../../layouts/Auxx';

const sideDrawer = (props) => {
  console.log('sideDrawer',props);

  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.openClose) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Auxx>
      <Backdrop
          prikaziBackdrop={props.openClose} 
          clicked={props.clicked} />

      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo height='50px' />
        </div>
        <nav>
          <NavigationItems active={true} />
        </nav>
      </div>
    </Auxx>
  );
};

export default sideDrawer;

import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' active={true} boja='green'>
        Burger Builder
      </NavigationItem>

      <NavigationItem link='/' boja='blue'>
        CheckOut
      </NavigationItem>
    </ul>
  );
};

export default navigationItems;

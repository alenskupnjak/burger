import React from 'react';
import classes from './Toolbar.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawToggler from '../SideDrawer/DrawToggler/DrawToggler';

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawToggler clicked= {props.drawToggleClicked} ></DrawToggler>
        <Logo height='50px'></Logo>
      <div className={classes.DesktopOnly}>
        <NavigationItems></NavigationItems>
      </div>
    </header>
  );
};

export default toolbar;

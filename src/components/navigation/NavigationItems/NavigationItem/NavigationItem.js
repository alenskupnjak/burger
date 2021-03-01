import React from 'react';
import classes from './NavigationItem.css';

const navigationItem = (props) => {
  return (
    <div>
      <li className={classes.NavigationItem} >
        <a
          href={props.link}
          className={props.active ? classes.active : null}
          // style={{ backgroundColor: props.boja }}
        >
          {props.children}
        </a>
      </li>
    </div>
  );
};

export default navigationItem;

import React, { Component } from 'react';
import Auxx from './Auxx';
import classes from './Layout.css';
import Toolbar from '../components/navigation/Toolbar/Toolbar';
import SideDrawer from '../components/navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };


  otvoriZatvorSidemenuHandelr = () => {
    this.setState({ showSideDrawer: false });
  };

  drawToggleClicked = () => {
    this.setState( (prevState) => {
        return { showSideDrawer: !prevState.showSideDrawer };
      })
  };


  render() {
    return (
      <div className={classes.Layouts}>
        <Toolbar drawToggleClicked={this.drawToggleClicked}></Toolbar>
        <SideDrawer
          clicked={this.otvoriZatvorSidemenuHandelr}
          openClose={this.state.showSideDrawer}
        ></SideDrawer>
        <main className={classes.Content}>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;

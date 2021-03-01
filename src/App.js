import React, { Component } from 'react';

import Layout  from './layouts/Layout'
import BurgerBuilder  from './containers/BurgerBuilder'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder>
            Test
          </BurgerBuilder>
        </Layout>
      </div>
    );
  }
}

export default App;

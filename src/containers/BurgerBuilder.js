import React, { Component } from 'react';
import Auxx from '../layouts/Auxx';
import Burger from '../components/burger/Burger';
import BurgerControls from '../components/controls/BurgerControls';
import Modal from '../components/UI/Modal/Modal';
import Spinner from '../components/UI/Spinner/Spinner';
import OrderSummary from '../components/burger/OrderSummary/OrderSummary';
import withErrorHandler from '../hoc/withErrorHandler';

import axios from '../axious-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4.0,
    purchasable: false,
    narudba: false,
    loadingSpinner: false,
  };

  //  dodaje namirnice sa liste
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const kopijaIngredients = { ...this.state.ingredients };
    kopijaIngredients[type] = updatedCount;
    const dodanaCijenaNoveNamirnice = INGREDIENT_PRICES[type];
    const staraCijena = this.state.totalPrice;
    const novaCijena = dodanaCijenaNoveNamirnice + staraCijena;
    this.setState({
      totalPrice: novaCijena,
      ingredients: kopijaIngredients,
      purchasable: true,
    });
  };

  // Mice namirnice sa liste
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount === 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const kopijaIngredients = { ...this.state.ingredients };
    kopijaIngredients[type] = updatedCount;
    const cijenaNoveNamirnice = INGREDIENT_PRICES[type];
    const staraCijena = this.state.totalPrice;
    const novaCijena = staraCijena - cijenaNoveNamirnice;

    // nema više namirnice
    if (novaCijena.toFixed(2) < 4.1) {
      this.setState({ purchasable: false });
    }

    this.setState({
      totalPrice: novaCijena,
      ingredients: kopijaIngredients,
    });
  };

  //  ORDER narudba
  narudbaHandler = () => {
    console.log('narudba');
    this.setState({ narudba: true });
  };

  // CANCEL narudba
  otkazivanjeNarudbaHandler = () => {
    console.log(' Otkazivanje narudbe');
    this.setState({ narudba: false });
  };

  // OK narudba, narudb u FIREBASE
  nastavakNarudbeHandler = () => {
    this.setState({ loadingSpinner: true });
    // spremanje narudbe za slanje u FIREBASE
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Alen',
        address: {
          ulica: 'Kasinska',
          country: 'Hrvatska',
          zipCode: '10360',
        },
      },
      email: 'test@test.com',
      dostava: 'brza',
    };
    // Za FIREBASE obavezno dodati .json
    axios
      .post('/reactMaxBurgerOrders.json', order)
      .then((res) => {
        this.setState({narudba: false, loadingSpinner: false});
      })
      .catch((err) => {
        this.setState({ narudba: false, loadingSpinner: false});
        console.log(err);
      });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (let data in disabledInfo) {
      if (disabledInfo[data] === 0) {
        disabledInfo[data] = true;
      } else {
        disabledInfo[data] = false;
      }
    }

    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        zatvoriModal={this.otkazivanjeNarudbaHandler}
        nastavakNarudbe={this.nastavakNarudbeHandler}
      ></OrderSummary>
    );

    if(this.state.loadingSpinner) {
      orderSummary= <Spinner/>
    }

    return (
      <Auxx>
        <Modal
          prikaziModal={this.state.narudba}
          zatvoriModal={this.otkazivanjeNarudbaHandler}
        >
          {orderSummary}
        </Modal>

        <Burger ingredients={this.state.ingredients}></Burger>

        <BurgerControls
          namirnicaDodana={this.addIngredientHandler}
          namirnicaOduzeta={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          mozeSeKupiti={this.state.purchasable}
          narudbaFunc={this.narudbaHandler}
        ></BurgerControls>
      </Auxx>
    );
  }
}

export default  withErrorHandler(BurgerBuilder, axios);

import React, { Component } from 'react';
import Auxx from '../layouts/Auxx';
import Burger from '../components/burger/Burger';
import BurgerControls from '../components/controls/BurgerControls';
import Modal from '../components/UI/Modal/Modal';
import Spinner from '../components/UI/Spinner/Spinner';
import OrderSummary from '../components/burger/OrderSummary/OrderSummary';
import withErrorHandler from '../hoc/withErrorHandler';
import axiosSetup from '../axious-orders';

const INGREDIENT_PRICES = {
  salad: 1,
  bacon: 1,
  cheese: 1,
  meat: 1,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4.0,
    purchasable: false,
    narudba: false,
    loadingSpinner: false,
  };

  componentDidMount() {
    axiosSetup
      .get('/reactMaxBurgerIngredience.json')
      .then((res) => {
        console.log(res.data);
        this.setState({
          ingredients: {
            salad: res.data.salad,
            bacon: res.data.bacon,
            cheese: res.data.cheese,
            meat: res.data.meat,
          },
        }).catch(err=>{
          console.log(err);
        });

        // provjeravam narucu order button
        const disabledInfo = { ...this.state.ingredients };
        for (let data in disabledInfo) {          
          if (disabledInfo[data] !== 0) {
            this.addIngredientHandler(data,'baza')
            this.setState({purchasable : true})
          } 
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 
  //  dodaje namirnice sa liste
  addIngredientHandler = (type, izBaze=null) => {
    const oldCount = this.state.ingredients[type];
    let updatedCount = oldCount + 1;
    if(izBaze) {
      console.log('smanjio');
      updatedCount--
    }
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

  // 
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

  // 
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
    axiosSetup
      .post('/reactMaxBurgerOrders.json', order)
      .then((res) => {
        this.setState({ narudba: false, loadingSpinner: false });
      })
      .catch((err) => {
        this.setState({ narudba: false, loadingSpinner: false });
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

    // definiram sumary
    let orderSummary = null;
    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          zatvoriModal={this.otkazivanjeNarudbaHandler}
          nastavakNarudbe={this.nastavakNarudbeHandler}
        ></OrderSummary>
      );
      if (this.state.loadingSpinner) {
        orderSummary = <Spinner />;
      }
    }

    // 
    let burger = <Spinner />;
    
    
    // definiram ingredience
    if (this.state.ingredients) {
      burger = (
        <Auxx>
          <Burger ingredients={this.state.ingredients}></Burger>
          <BurgerControls
            namirnicaDodana={this.addIngredientHandler}
            namirnicaOduzeta={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            mozeSeKupiti={this.state.purchasable}
            narudbaFunc={this.narudbaHandler}
          >
          </BurgerControls>
        </Auxx>
      );
    }

    return (
      <Auxx>
        <Modal
          prikaziModal={this.state.narudba}
          zatvoriModal={this.otkazivanjeNarudbaHandler}
        >
          {orderSummary}
        </Modal>
           {burger}
      </Auxx>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axiosSetup);

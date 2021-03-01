import React, { Component } from 'react';

import Modal from '../components/UI/Modal/Modal';
import Auxx from '../layouts/Auxx';

//  ovo je HOC componenta
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentDidMount() {
      //  Kad šaljem request, setiram error na null
      axios.interceptors.request.use(req => {
        this.setState({ error:null });
        return req
      });
      axios.interceptors.response.use(null, (error) => {
        this.setState({ error: error });
        return error
      });
    }

    errorConfirmHandler = () => {
      this.setState({error:null})
    }

    render() {
      return (
        <Auxx>
          {/* Ovaj modal se prikazuje iznad komponente */}
          <Modal 
              prikaziModal={this.state.error}
              zatvoriModal = {this.errorConfirmHandler}
          >
                {this.state.error ? this.state.error.message :null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxx>
      );
    }
  };
};

export default withErrorHandler;

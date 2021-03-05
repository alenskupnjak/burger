import React, { Component } from 'react';
import Modal from '../components/UI/Modal/Modal';
import Auxx from '../layouts/Auxx';

//  ovo je HOC componenta
const withErrorHandler = (WrappedComponent, axiosSetup) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentDidMount() {
      //  Kad šaljem request, setiram error na null
      this.reqInterceptor = axiosSetup.interceptors.request.use((req) => {
        console.log('%c witherror.interceptors.REQ', 'color:green;', req);
        this.setState({ error: null });
        return req;
      });

      //
      this.resInterceptor = axiosSetup.interceptors.response.use(
        // null,
        (res) => {
          console.log('%c witherror.interceptors.RES', 'color:green;', res);
          return res;
        },
        (error) => {
          console.log(
            '%c witherror.interceptors.RES error',
            'color:red;',
            error
          );
          this.setState({ error: error });
          return error;
        }
      );
    }

    // Štiti od memory leak-s
    componentWillUnmount() {
      console.log('%c componentWillUnmount', 'color:magenta');
      
      axiosSetup.interceptors.request.eject(this.reqInterceptor);
      axiosSetup.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Auxx>
          {/* Ovaj modal se prikazuje iznad komponente */}
          <Modal
            prikaziModal={this.state.error}
            zatvoriModal={this.errorConfirmHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxx>
      );
    }
  };
};

export default withErrorHandler;

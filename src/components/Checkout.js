import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Elements } from 'react-stripe-elements';
import { Grid, Container, Header, Button } from 'semantic-ui-react';
import { formatPrice } from '../helpers';
import { withAuth0 } from '@auth0/auth0-react';

import NavBar from './NavBar';
import CustomerDetailsForm from './CustomerDetailsForm';
import PaymentForm from './PaymentForm';
import Footer from './Footer';

class Checkout extends Component {

  static propTypes = {
    orderTotal: PropTypes.number,
    customerDetails: PropTypes.object,
    loadSampleCustomer: PropTypes.func.isRequired,
    updateCustomerDetails: PropTypes.func.isRequired,
    checkoutTotal: PropTypes.number
  }

  state = {
    customerForm: false,
    paymentForm: false,
    completedForm: false,
    showResult: false,
    apiMessage: "",
    error: null,
  }

  checkPaymentForm = (bool) => {
    this.setState({ paymentForm: bool});
  }

  checkCustomerForm = () => {
    const { firstName, lastName, email, contactNum, address } = this.props.customerDetails;

    if (firstName && lastName && email && contactNum && address) {
      this.setState({ customerForm: true });
      return true
    } else {
      this.setState({ customerForm: false });
      return false
    }
  }

  callApi = async () => {
    try {
      const token = await this.props.auth0.getAccessTokenSilently();

      const response = await fetch(`http://localhost:3001/api/order/create`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      this.setState({
        showResult: true,
        apiMessage: responseData,
      });
    } catch (error) {
      this.setState({
        error: error.error,
      });
    }
  };

  handleSubmit = () => {
    if(this.checkCustomerForm() && this.state.paymentForm) {
      this.callApi();
      this.setState({ completedForm: true });
    } else {
      this.setState({ completedForm: false });
    }
  }

  render(){

    const {
      isLoading,
      isAuthenticated,
      error,
      user,
      logout,
    } = this.props.auth0;

    if (!isLoading && !isAuthenticated){
      return <Redirect push to='/' />;
      }

    if (this.state.completedForm && this.state.showResult) {
    return <Redirect push to='/confirmed' />;
    }

    return(
      <Fragment>
        <NavBar orderTotal={this.props.orderTotal}/>
        <Container id='page-container'>
          <Header as='h1' id="page-header">Checkout</Header>
          <Grid stackable columns={2}>
            <Grid.Column width={10}>
              <Header as='h3' id='checkout-subheader'>Your Details</Header>
              <CustomerDetailsForm
                customerDetails={this.props.customerDetails}
                updateCustomerDetails={this.props.updateCustomerDetails}
                loadSampleCustomer={this.props.loadSampleCustomer}
                formStatus={this.checkCustomerForm}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as='h3' id='checkout-subheader'>Payment</Header>
              <Elements>
                <PaymentForm formStatus={this.checkPaymentForm} />
              </Elements>
              <Button color='teal' size='large' id='checkout-btn' onClick={this.handleSubmit}>Place Order & Pay {formatPrice(this.props.checkoutTotal)} </Button>
            </Grid.Column>
          </Grid>
        </Container>
        <Footer />
      </Fragment>
    )
  }
}

export default withAuth0(Checkout);

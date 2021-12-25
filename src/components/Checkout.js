import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Elements } from 'react-stripe-elements';
import { Grid, Container, Header, Button } from 'semantic-ui-react';
import { formatPrice, getConfig } from '../helpers';
import { withAuth0 } from '@auth0/auth0-react';

import NavBar from './NavBar';
import CustomerDetailsForm from './CustomerDetailsForm';
import PaymentForm from './PaymentForm';
import Footer from './Footer';

class Checkout extends Component {

  static propTypes = {
    orderTotal: PropTypes.number,
    order: PropTypes.array,
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
    apiResponse: "",
    error: null,
  }

  checkPaymentForm = (bool) => {
    this.setState({ paymentForm: bool});
  }

  checkCustomerForm = () => {
    const { firstName, lastName, email, contactNum, address, zip } = this.props.customerDetails;

    if (firstName && lastName && email && contactNum && address && zip) {
      this.setState({ customerForm: true });
      return true
    } else {
      this.setState({ customerForm: false });
      return false
    }
  }

  placeOrder = async () => {
    try {

      const config = getConfig();

      const token = await this.props.auth0.getAccessTokenSilently();

      const response = await fetch(`${config.apiOrigin}/api/order/create`, {
        method:'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order : {items : this.props.order, orderTotal: this.props.orderTotal }})
      });

      const responseData = await response.json();

      this.setState({
        showResult: true,
        apiResponse: responseData,
        
      });
    } catch (error) {
      this.setState({
        error: error.error,
      });
    }
  };

  handleSubmit = () => {
    if(this.checkCustomerForm() && this.state.paymentForm) {
      this.placeOrder();
      this.setState({ completedForm: true });
    } else {
      this.setState({ completedForm: false });
    }
  }

  render(){

    const {
      isLoading,
      isAuthenticated,
      user,
    } = this.props.auth0;

    if ((!isLoading && !isAuthenticated) || (isAuthenticated && !user.email_verified)) {
      return <Redirect push to='/' />;
      }

    if (this.state.completedForm && this.state.showResult) {
    return <Redirect push to={{
        pathname: '/confirmed',
        state: { orderNum: this.state.apiResponse.orderNum }
      }} />;
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

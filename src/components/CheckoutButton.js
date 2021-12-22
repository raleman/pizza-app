import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Image } from 'semantic-ui-react';
import { withAuth0 } from '@auth0/auth0-react';

class CheckoutButton extends Component{

  static propTypes = {
    checkoutTotal: PropTypes.number,
    updateCheckoutTotal: PropTypes.func.isRequired,
  }

  render(){

    const {
      isLoading,
      isAuthenticated,
      error,
      user,
      loginWithRedirect,
      logout,
    } = this.props.auth0;

    if (isLoading) {
      return '';
    }

    if (isAuthenticated && !user.email_verified) {
      return <Button color='teal' size='large' onClick={loginWithRedirect}>Verify Email</Button>;
    }
    
    if (isAuthenticated) {
      return <Button as={Link} to='/checkout' id='cart-checkout-btn' color='teal' onClick={() => this.props.updateCheckoutTotal(this.props.checkoutTotal)}>Go to Payment</Button>;

    } else {
      return <Button color='teal' size='large' onClick={loginWithRedirect}>Log in or Sign Up</Button>;
    }


  }
}

export default withAuth0(CheckoutButton);

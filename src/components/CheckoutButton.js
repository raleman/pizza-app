import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
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
      user,
      loginWithRedirect,
    } = this.props.auth0;

    if (isLoading) {
      return '';
    }

    if (isAuthenticated && !user.email_verified) {
      return (
        <Modal trigger={<Button size='large' color='teal'>Verify Email</Button>} closeIcon>
          <Modal.Header>Verify Your Email</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p><strong>A verification email was sent to {user.email} when you logged in. Click on the link in the email, then hit the button proceed.</strong></p>
              <Button color='teal' size='large' onClick={loginWithRedirect}>I'm Verified</Button>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      );
    }
    
    if (isAuthenticated) {
      return <Button as={Link} to='/checkout' id='cart-checkout-btn' color='teal' onClick={() => this.props.updateCheckoutTotal(this.props.checkoutTotal)}>Go to Payment</Button>;

    } else {
      return <Button color='teal' size='large' onClick={loginWithRedirect}>Log in or Sign Up</Button>;
    }


  }
}

export default withAuth0(CheckoutButton);

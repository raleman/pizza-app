import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, Icon, Container, Button } from 'semantic-ui-react';
import { formatPrice } from '../helpers';
import { withAuth0 } from '@auth0/auth0-react';

class NavBar extends Component{

  static propTypes = {
    orderTotal: PropTypes.number
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

    return(
      <Menu fixed='top' borderless id='navbar'>
        <Container>
          <Menu.Item as={Link} to='/' id='navbar-header'>Pizza 42</Menu.Item>
          <Menu.Item id='navbar-login' position='right'>
          {!isAuthenticated && (
            <Button color='teal' onClick={loginWithRedirect}>Log in</Button>
          )}
          {isAuthenticated && (
            <Button color='teal' onClick={logout}>Log out</Button>
          )}
          </Menu.Item>       
          <Menu.Item id='navbar-total' position='right'>
            <Icon name='cart'/>
            {formatPrice(this.props.orderTotal)}
            {this.props.children}
          </Menu.Item>
        </Container>
      </Menu>
    )
  }
}

export default withAuth0(NavBar);

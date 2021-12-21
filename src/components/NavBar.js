import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, Icon, Container } from 'semantic-ui-react';
import { formatPrice } from '../helpers';

import AccountButton from './AccountButton';

class NavBar extends Component{

  static propTypes = {
    orderTotal: PropTypes.number
  }

  render(){

    return(
      <Menu fixed='top' borderless id='navbar'>
        <Container>
          <Menu.Item as={Link} to='/' id='navbar-header'>Pizza 42</Menu.Item>     
          <Menu.Item as={Link} to='/cart' id='navbar-total' position='right'>
            <Icon name='cart'/>
            {formatPrice(this.props.orderTotal)}
            <AccountButton />
          </Menu.Item>
        </Container>
      </Menu>
    )
  }
}

export default NavBar;

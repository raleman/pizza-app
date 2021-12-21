import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Header, Container } from 'semantic-ui-react';

import NavBar from './NavBar';
import Footer from './Footer';
import PizzaContainer from './PizzaContainer';

const Menu = (props) => (
  <Fragment>
    <NavBar order={props.order} orderTotal={props.orderTotal}>
    </NavBar>
    <Container id='page-container'>
      <Header as='h1' id='page-header'>Pizza Selection</Header>
      <Container textAlign='center' id='menu-free-banner'>
        <p id='menu-banner-text'>Free delivery for orders over $12</p>
      </Container>
      <Container id='menu-pizza-container'>
          <PizzaContainer addToOrder={props.addToOrder} />
      </Container>
    </Container>
    <Footer />
  </Fragment>
);

Menu.propTypes = {
  order: PropTypes.array,
  orderTotal: PropTypes.number,
  addToOrder: PropTypes.func.isRequired
};

export default Menu;

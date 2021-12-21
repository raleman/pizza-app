import React, { Component, Fragment } from 'react';
import { Link  } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Container, Header } from 'semantic-ui-react';

import NavBar from './NavBar';
import UserDetails from './UserDetails'
import Footer from './Footer';

class Profile extends Component {

  static propTypes = {
    orderTotal: PropTypes.number,
    addToOrder: PropTypes.func.isRequired,
    removeFromOrder: PropTypes.func.isRequired,
    order: PropTypes.array,
    updateCheckoutTotal: PropTypes.func.isRequired,
  }

  render(){

    return(
      <Fragment>
        <NavBar orderTotal={this.props.orderTotal}/>
        <Container id='page-container'>
          <Container id='cart-header'>
            <Header as='h1' id='page-header'>Your Profile</Header>
              <UserDetails />
            <Button as={Link} to='/' color='teal' size='large' id='cart-menu-btn'>Back to Menu</Button>
          </Container>

          </Container>
          <Footer />
      </Fragment>
    );
  }
}

export default Profile;

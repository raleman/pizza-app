import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Image } from 'semantic-ui-react';
import { withAuth0 } from '@auth0/auth0-react';

class AccountButton extends Component{

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

    if (isAuthenticated) {
      return (
        <Image as={Link} to="/profile" size="mini" src={user.picture} circular>
        </Image>
      );
    } else {
      return <Button color='teal' size='large' onClick={loginWithRedirect}>Log in</Button>;
    }


  }
}

export default withAuth0(AccountButton);

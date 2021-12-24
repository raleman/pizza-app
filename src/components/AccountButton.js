import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Image } from 'semantic-ui-react';
import { withAuth0 } from '@auth0/auth0-react';

class AccountButton extends Component{

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

    if (isAuthenticated) {
      return (
        <Image as={Link} to="/profile" size="mini" src={user.picture} circular>
        </Image>
      );
    } else {
      return <Button color='teal' size='large' onClick={()=>loginWithRedirect({redirectUri:window.location.href})}>Log in</Button>;
    }


  }
}

export default withAuth0(AccountButton);

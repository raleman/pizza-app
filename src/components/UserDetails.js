import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Image } from 'semantic-ui-react';
import { withAuth0 } from '@auth0/auth0-react';

class UserDetails extends Component {


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
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Oops... {error.message}</div>;
    }
  
    if (isAuthenticated) {
      return (
          <Card fluid>
            <Card.Content>
            <Image
                floated='right'
                size='massive'
                src={user.picture}
                avatar
                
              />
              <Card.Header>{user.name}</Card.Header>
              <Card.Description style={{overflowWrap:'anywhere'}}>
                {JSON.stringify(user, null, 2)}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button color='teal' size='large' onClick={() => logout({ returnTo: window.location.origin })}>
              Log out
            </Button>
            </Card.Content>
          </Card>
      );
    } else {
      return <div>Please log in</div>;   
    }


  }
}

export default withAuth0(UserDetails);

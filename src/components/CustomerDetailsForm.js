import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Segment } from 'semantic-ui-react';
import { withAuth0 } from '@auth0/auth0-react';

class CustomerDetailsForm extends Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    const { firstName, lastName, email} = this.props.customerDetails;
    const {
      isLoading,
      isAuthenticated,
      user
    } = this.props.auth0;

    if (!isLoading && isAuthenticated) {
      if (!firstName && user.given_name) {
        this.props.customerDetails.firstName = user.given_name
      }
  
      if (!lastName && user.family_name) {
        this.props.customerDetails.lastName = user.family_name
      }
  
      if (!email && user.email) {
        this.props.customerDetails.email = user.email
      }
    }
  }

  static propTypes = {
    customerDetails: PropTypes.object,
    loadSampleCustomer: PropTypes.func.isRequired,
    updateCustomerDetails: PropTypes.func.isRequired,
  }

  updateCustomerDetail = (name,value) => {
    const updateCustomer = {
      ...this.props.customerDetails,
      [name]: value
    }
    this.props.updateCustomerDetails(updateCustomer);
    this.profileImported=true
    }

  handleChange = (e) => {
    this.updateCustomerDetail(e.currentTarget.name, e.target.value)
  }


  render(){

    const { firstName, lastName, email, contactNum, address, zip } = this.props.customerDetails;


    return (
    <div>
      <Button size='tiny' color='teal' onClick={this.props.loadSampleCustomer}><span role='img' aria-label='man-with-beard'>🧔🏻‍</span> Fill with fake customer</Button>
      <Segment>
        <Form id='checkout-customer-form'>
          <Form.Group widths='equal'>
            <Form.Input
              fluid
              label='First name'
              type='text'
              placeholder='First name'
              name='firstName'
              value={firstName}
              onChange={this.handleChange}
              required />
            <Form.Input
              fluid
              label='Last name'
              type='text'
              placeholder='Last name'
              name='lastName'
              value={lastName}
              onChange={this.handleChange}
              required />
          </Form.Group>

          <Form.Input
            label='Email'
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={this.handleChange}
            required />
          <Form.Input
            label='Contact No.'
            type='tel'
            placeholder='Contact No.'
            name='contactNum'
            value={contactNum}
            onChange={this.handleChange}
            required />
          <Form.Input
            label='Address'
            type='text'
            placeholder='Address'
            name='address'
            value={address}
            onChange={this.handleChange}
            required />
          <Form.Input
            label='Zip'
            type='text'
            placeholder='Zip'
            name='zip'
            value={zip}
            onChange={this.handleChange}
            required />
        </Form>
      </Segment>
    </div>
    );
  }
}

export default withAuth0(CustomerDetailsForm);

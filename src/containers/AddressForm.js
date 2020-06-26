import React, { Component } from 'react';
import { connect } from 'react-redux';

import { placeOrder } from '../actions/';
import classes from './Checkout/Checkout.module.css'

class AddressForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         name: "",
         street: "",
         locality: "",
         city: "",
         pincode: "",
      }
   }

   handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   }

   handleSubmit = e => {
      e.preventDefault();
      const { onPlaceOrder, cart } = this.props;
      const address = this.state;
      onPlaceOrder(address, cart);
   }

   render() {
      const { name, street, locality, city, pincode } = this.state;
      return (
         <div className={classes.AddressForm}>
            <form onSubmit={this.handleSubmit}>
               <label htmlFor="name">Name</label>
               <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
               />
               <br/>
               <label htmlFor="street">Address</label>
               <input
                  type="text"
                  id="street"
                  name="street"
                  placeholder="Line 1 - street"
                  value={street}
                  onChange={this.handleChange}
               />
               <br/>
               <input
                  type="text"
                  id="locality"
                  name="locality"
                  placeholder="Line 2 - locality"
                  value={locality}
                  onChange={this.handleChange}
               />
               <br/>
               <label htmlFor="city">City</label>
               <input
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  onChange={this.handleChange}
               />
               <br/>
               <label htmlFor="pincode">Pincode</label>
               <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={pincode}
                  onChange={this.handleChange}
               />
               <br/>
               <button>SUBMIT</button>
            </form>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   cart: state.cart,
}) 

const mapDispatchToProps = dispatch => ({
   onPlaceOrder: (address, cart) => dispatch(placeOrder(address, cart))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);

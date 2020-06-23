import React, { Component } from 'react';

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

   }

   render() {
      const { name, street, locality, city, pincode } = this.state;
      return (
         <div>
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
                  name="loaclity"
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

export default AddressForm;

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { logout } from '../actions/'
 
class Navbar extends Component {
   render() {
      return (
         <div>
            <Link to="/">Home</Link>
            {' '}
            <Link to="/cart">Cart</Link>
            {' '}
            {this.props.isAuthenticated 
               ? (
                     <div>
                        Hello, {this.props.name}
                        <button
                           onClick={this.props.logout}>
                           Logout
                        </button>
                     </div>
                  )
               : (
                     <Link to="/login">Login</Link>
                  ) 
            }
         </div>
      )
   }
}

const mapStateToProps = state => ({
   ...state.user
}) 

const mapDispatchToProps = dispatch => ({
   logout: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

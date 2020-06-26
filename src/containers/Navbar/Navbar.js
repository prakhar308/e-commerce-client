import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { logout } from '../../actions/'
import classes from './Navbar.module.css'; 

class Navbar extends Component {
   render() {
      return (
         <div>
            <header>
               <nav>
                  <Link to="/">
                     <i className="fa fa-leaf fa-2x" aria-hidden="true"></i>
                  </Link>
                  <Link to="/cart">
                     <i className="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
                  </Link>
               </nav>
               <h2>
                  {this.props.isAuthenticated 
                     ? (
                           <div>
                              Hello, {this.props.name}
                              {' '}
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
               </h2>
            </header>   
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

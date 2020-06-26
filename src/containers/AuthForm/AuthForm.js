import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import { auth } from '../../actions/'
import classes from './AuthForm.module.css'

class AuthForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         name: "",
         email: "",
         password: "",
         isLogin: true,
      }
   }

   handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   }

   switchAuthMode = () => {
      this.setState(prevState => ({
         isLogin: !this.state.isLogin
      }))
   }

   handleSubmit = e => {
      const { email, password, isLogin, name } = this.state;
      e.preventDefault();
      this.props.onAuth(email, password, isLogin, name)
   }

   render() {
      const { email, password, isLogin, name } = this.state;
      const { error, isAuthenticated } = this.props;

      let authRedirect = null;
      // if user is already signedin then redirect user
      if (isAuthenticated) {
         authRedirect = <Redirect to="/" />
      }

      let errorMessage = null;
      if (error) {
         errorMessage = error
      }

      return (
         <div className={classes.AuthForm}>
            {authRedirect}
            {errorMessage}
            <h1>{isLogin ? 'Login' : 'Signup'}</h1>
            <form onSubmit={this.handleSubmit}>
               {!isLogin && (
                  <input
                     type="text"
                     name="name"
                     required={true}
                     placeholder="Enter Name"
                     value={name}
                     onChange={this.handleChange}
                  />
               )}
               <input
                  type="text"
                  name="email"
                  required={true}
                  placeholder="Enter Email"
                  value={email}
                  onChange={this.handleChange}
               />
               <input
                  type="password"
                  name="password"
                  required={true}
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.handleChange}
               />
               <button>SUBMIT</button>
            </form>
            {
               isLogin 
               ? (
                     <div className={classes.AuthMode}>
                        <h2>New ?</h2> 
                        <button
                           onClick={this.switchAuthMode}
                        >Create new account</button>
                     </div>
                  )
               : (
                     <div>
                        <h2>Already have an account</h2>
                        <button
                           onClick={this.switchAuthMode}
                        >Login</button>
                     </div>
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
   onAuth: (email, password, isLogin, name) => {
      dispatch(auth(email, password, isLogin, name))
   }
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);

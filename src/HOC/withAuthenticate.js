import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose} from "redux";

let withAuthenticate = (WrappedComponent) => {
   return class extends React.Component {
      render() {
         if (this.props.isAuthenticated) {
            return <WrappedComponent {...this.props}/>
         } else {
            return <Redirect to="/login" />
         }
      }
   }
}

const mapStateToProps = state => ({
   isAuthenticated: state.user.isAuthenticated
})

withAuthenticate = compose(
   connect(mapStateToProps),
   withAuthenticate
)

export default withAuthenticate;

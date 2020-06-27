import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

const OrderConfirmed = (props) => {
   const lastOrder = props.orders[0];
   return (
      <div>
         { lastOrder 
            ?  (
                  <div>
                     Your Order has been placed successfully.
                     <br/>
                     Date: {lastOrder.date}
                     <br/>
                     Order id: {lastOrder._id}
                     <br/>
                  </div>
               ) 
            : null
         }
         <Link to="/">Continue Shopping</Link>
      </div>
   )
}

const mapStateToProps = state => ({
   orders: state.order.orders
})

export default connect(mapStateToProps)(OrderConfirmed);

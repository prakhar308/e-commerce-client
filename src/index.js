import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import rootReducer from './reducers/products';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
   applyMiddleware(thunk)
));

ReactDOM.render(
   <Provider store={store}>
      <Router>
         <App store={store} />
      </Router>
   </Provider>,
   document.getElementById('root')
);

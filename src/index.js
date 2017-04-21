import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, browserHistory } from 'react-router';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import routes from './routes';
import './index.css';

import App from './components/App';


  // Initialize Firebase
const config = {
  apiKey: "AIzaSyAdhbyNH6uCWSP9RM6uDAZNqOxFzIRCG0U",
  authDomain: "cattykat-f3941.firebaseapp.com",
  databaseURL: "https://cattykat-f3941.firebaseio.com",
  projectId: "cattykat-f3941",
  storageBucket: "cattykat-f3941.appspot.com",
  messagingSenderId: "585926750685"
};
firebase.initializeApp(config);

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('root')
);

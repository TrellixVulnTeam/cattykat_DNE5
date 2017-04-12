import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import App from './App';
import './index.css';

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

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

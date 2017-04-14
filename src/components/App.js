import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { handleGoogleSignIn } from '../actions';
import Header from './Header';
import PostsNew from './PostsNew';
import PostsList from './PostsList';
import LoginForm from './LoginForm';
import './App.css';

class App extends Component { 

  renderUploadForm() {
    if(this.props.isLoggedIn) {
      return (
        <PostsNew />
      );      
    }
    return (
      <LoginForm />
    );
  }
  
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <div className="row">
            {this.renderUploadForm()}
          </div>
          <PostsList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    isLoggedIn
  } = state.auth;

  return {
    isLoggedIn
  }
}

export default connect(mapStateToProps, { handleGoogleSignIn })(App);

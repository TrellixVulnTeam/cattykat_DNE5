import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGoogleSignIn } from '../actions';
import logo from '../logo.svg';

class Header extends Component {

    renderTopLogo() {
        if(this.props.isLoggedIn) {
        return (
            <div>
                <img style={{ width: 80, borderRadius: 40 }} src={this.props.userPhotoURL} className="App-logo" alt="user-image" />
                <h6>Hello {this.props.userDisplayName}</h6>
            </div>
            );
        }
        return (
            <div>
                <img src={logo} className="App-logo" alt="logo" />
                <br />
                <small>built with <a href="https://facebook.github.io/react/" target="__blank">React</a></small>
            </div>
        );
    }

    render() {
        return(
            <div className="App-header">
                {this.renderTopLogo()}
                <h2>Welcome to Catty Kat!</h2>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  const {
    userDisplayName,
    userPhotoURL,
    isLoggedIn
  } = state.auth;

  return {
    userDisplayName,
    userPhotoURL,
    isLoggedIn
  }
}


export default connect(mapStateToProps, { handleGoogleSignIn })(Header);

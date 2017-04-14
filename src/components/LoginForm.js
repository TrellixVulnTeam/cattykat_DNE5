import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { handleGoogleSignIn } from '../actions';

class LoginForm extends Component {    
    render() { 
        return (
            <div className="jumbotron text-center col-sm-6 col-sm-offset-3">
                <h2>Log in to upload an image!</h2>
                <button
                    className="text-center btn btn-secondary"
                    id="sign-in"
                    onClick={() => this.props.handleGoogleSignIn()}
                >
                    Sign-in with Google
                </button>
            </div>
        );
    }
}

export default connect(null, { handleGoogleSignIn })(LoginForm);

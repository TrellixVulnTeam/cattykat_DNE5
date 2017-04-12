import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import logo from './logo.svg';
import './App.css';

class App extends Component { 

  constructor() {
    super();
    this.state = {
      title: '',
      category: '',
      isUploading: false,
      progress: 0,
      catImageFilename: '',
      imageURL: '',
      userDisplayName: '',
      userPhotoURL: '',
      userToken: '',
      isLoggedIn: '',
      allPosts: []
    }
  }

  componentDidMount() {
    firebase.database().ref('posts').orderByKey().on('value', (snap) => {
      this.setState({
        allPosts: snap.val()
      });
    });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  };

  handleCategoryChange(event) {
    this.setState({ category: event.target.value });
  }

  // handleImageChange(event) {
  //   console.log(event);
  // }
    
  handleSubmit(event) {
    event.preventDefault();
    const { currentUser } = firebase.auth();
    const {
      title,
      category,
      catImageFilename,
      imageURL,
      userDisplayName,
      userPhotoURL
    } = this.state;

    firebase
      .database().ref(`/users/${currentUser.uid}/posts`)
        .push({
          title,
          category,
          catImageFilename,
          imageURL,
          userDisplayName,
          userPhotoURL
        })
        .then(() => {
          firebase.database().ref(`/posts`)
            .push({
              title,
              category,
              catImageFilename,
              imageURL,
              userDisplayName,
              userPhotoURL
            })
            .then(() => {
              this.setState({
                title: '',
                category: '',
                catImageFilename: '',
                imageURL: '',
              });
            });
        });
  }

  handleUploadStart = () => this.setState({isUploading: true, progress: 0});

  handleProgress = (progress) => this.setState({progress});

  handleUploadError = (error) => {
      this.setState({isUploading: false});
      console.error(error);
  }

  handleUploadSuccess = (filename) => {
      this.setState({catImageFilename: filename, progress: 100, isUploading: false});
      firebase.storage().ref('images').child(filename).getDownloadURL().then(url => {
        this.setState({imageURL: url})
      });
  };

  handleGoogleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        this.setState({
          userToken: result.credential.accessToken,
          userDisplayName: result.user.displayName,
          userPhotoURL: result.user.photoURL,
          isLoggedIn: true
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
  }

  handleSignOut() {
    // Sign out of Firebase.
    firebase.auth().signOut();
    this.setState({ isLoggedIn: false })
  }

  renderUploadForm() {
    if(this.state.isLoggedIn) {
      return (
        <div className="col-sm-4 col-sm-offset-4">
          <h3>Upload A New Cat</h3>
          <div id="user-container">
            <button
              className="pull-right"
              id="sign-out"
              onClick={this.handleSignOut.bind(this)}
            >
              Sign-out
            </button>
          </div>
          <form onSubmit={this.handleSubmit.bind(this)}>
              <label>Cat:</label>
              <br />
              {this.state.isUploading &&
                <p>Progress: {this.state.progress}</p>
              }
              {this.state.imageURL &&
                <img style={{ maxHeight: 250 }} src={this.state.imageURL} />
              }
              <FileUploader
                accept="image/*"
                name="catImageFilename"
                randomizeFilename
                storageRef={firebase.storage().ref('images')}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              />
            
            <div>
              OR
            </div>

            <div className="form-group">
              <label htmlFor="image-url">Image URL: </label>
              <input
                value={this.state.imageURL}
                type="text"
                onChange={event => this.setState({ imageURL: event.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Title: </label>
              <input
                value={this.state.title}
                type="text"
                onChange={this.handleTitleChange.bind(this)}
                className="form-control"
              />
            </div>

            <div className="form-group">
            <label htmlFor="category">Categories: </label>
              <input
                value={this.state.category}
                type="text"
                onChange={this.handleCategoryChange.bind(this)}
                className="form-control"
              />
            </div>
            
            <button className="btn btn-primary">Post</button>
          </form>
        </div>
      );      
    }
    return (
      <div className="jumbotron text-center col-sm-6 col-sm-offset-3">
        <h2>Log in to upload an image!</h2>
        <button
          className="text-center btn btn-secondary"
          id="sign-in"
          onClick={this.handleGoogleSignIn.bind(this)}
        >
          Sign-in with Google
        </button>
      </div>
    );
  }
  
  renderPosts() {
    const posts = _.map(this.state.allPosts, (title, category, imageURL) => {
      return {
        ...title,
        ...category,
        ...imageURL
      }
    }); 
    if (posts) {
      return (posts.reverse()).map((post) => {
          return (
              <li className="list-group-item" key={post.id}>
                <div className="text-center">
                  <img
                    style={{ height: 250 }}
                    src={post.imageURL}
                    alt={Math.floor((Math.random() * 1028) + 1)}
                  />
                  <h4>
                    <strong>{post.title}</strong>
                  </h4>
                  <p>
                    {post.category}
                  </p>
                </div>
                <div>
                  <img
                    style={{ height: 30 }}
                    src={post.userPhotoURL}
                    alt={post.userDisplayName + " avatar"}
                  />
                  <p>
                    {post.userDisplayName}
                  </p>
                </div>
            </li> 
          );
      });
    }
    return <div>Loading...</div>;
  }

  renderTopLogo() {
    if(this.state.isLoggedIn) {
      return (
        <div>
          <img style={{ width: 80, borderRadius: 40 }} src={this.state.userPhotoURL} className="App-logo" alt="user-image" />
          <h6>Hello {this.state.userDisplayName}</h6>
        </div>
      );
    }
    return <img src={logo} className="App-logo" alt="logo" />
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          {this.renderTopLogo()}
          <h2>Welcome to Catty-Kat</h2>
        </div>
        <div className="container">
          <div className="row">
            {this.renderUploadForm()}
          </div>
          <div className="row">
            <ul className="list-group" >
              {this.renderPosts()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

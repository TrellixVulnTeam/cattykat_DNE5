import React, {Component} from 'react';
import { connect } from 'react-redux';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';

class PostsNew extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            category: '',
            isUploading: false,
            progress: 0,
            catImageFilename: '',
            imageURL: '',
            imageFile: '',
            isLoggedIn: '',
            showImageURL: true,
            allPosts: []
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const {currentUser} = firebase.auth();
        const {
            title,
            category,
            catImageFilename,
            imageURL,
            imageFile
        } = this.state;

        const { userDisplayName, userPhotoURL } = this.props;

        const token = Math.random().toString(36).slice(-15);

        const storageRef = firebase.storage().ref('new_cats').child(`${firebase.auth().currentUser.uid}/tmp/${token}${catImageFilename}`)

        storageRef.put(imageFile)
            .then(snapshot => {
                this.setState({
                    imageURL: snapshot.downloadURL
                });
            });
            

        firebase
            .database()
            .ref(`/users/${currentUser.uid}/posts`)
            .push({
                title,
                category,
                catImageFilename,
                imageURL,
                userDisplayName,
                userPhotoURL
            })
            .then(() => {
                firebase
                    .database()
                    .ref(`/posts`)
                    .push({
                        title,
                        category,
                        catImageFilename,
                        imageURL,
                        userDisplayName,
                        userPhotoURL
                    })
                    .then(() => {
                        this.setState({title: '', category: '', catImageFilename: '', imageURL: '', showImageURL: true});
                    });
            });
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    };

    handleCategoryChange(event) {
        this.setState({category: event.target.value});
    }

    handleSignOut() {
        // Sign out of Firebase.
        firebase
            .auth()
            .signOut();
        this.setState({isLoggedIn: false})
    }

    handleFile(e){ 
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                imageFile: file,
                imageURL: reader.result,
                showImageURL: false
            });
        }
        reader.readAsDataURL(file)
    }

    showImageURLInput() {
        if (this.state.showImageURL) {
            return (
                <div>
                    <span>OR</span>
                    <div className="form-group">
                        <label htmlFor="image-url">Image URL:
                        </label>
                        <input
                            value={this.state.imageURL}
                            type="text"
                            onChange={event => this.setState({imageURL: event.target.value})}
                            className="form-control"/>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="col-sm-4 col-sm-offset-4">
                <h3>Upload A New Cat</h3>
                <div id="user-container">
                    <button
                        className="pull-right"
                        id="sign-out"
                        onClick={this
                        .handleSignOut
                        .bind(this)}>
                        Sign-out
                    </button>
                </div>
                <form
                    onSubmit={this
                    .handleSubmit
                    .bind(this)}>
                    <label>Cat:</label>
                    <br/> {this.state.isUploading && <p>Progress: {this.state.progress}</p>}   
                    {this.state.imageURL && <img
                        style={{
                            maxHeight: 250
                        }}
                        src={this.state.imageURL}/>
                    }
                    <input type="file" onChange={(e) => this.handleFile(e)} />
                    {this.showImageURLInput()}
                    <div className="form-group">
                        <label htmlFor="title">Title:
                        </label>
                        <input
                            value={this.state.title}
                            type="text"
                            onChange={this
                            .handleTitleChange
                            .bind(this)}
                            className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Categories:
                        </label>
                        <input
                            value={this.state.category}
                            type="text"
                            onChange={this
                            .handleCategoryChange
                            .bind(this)}
                            className="form-control"/>
                    </div>

                    <button className="btn btn-primary">Post</button>
                </form>
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


export default connect(mapStateToProps, null)(PostsNew);
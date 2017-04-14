import React, {Component} from 'react';
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
            userDisplayName: '',
            userPhotoURL: '',
            userToken: '',
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
            userDisplayName,
            userPhotoURL
        } = this.state;

        // firebase.storage().ref.put('images').child(`${firebase.auth().currentUser.uid
        // }/uploads/`).getDownloadURL().then(url => {   this.setState({imageURL: url
        // }); });

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

    handleUploadStart = () => this.setState({isUploading: true, progress: 0});

    handleProgress = (progress) => this.setState({progress});

    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    }

    handleUploadSuccess = (filename) => {

        this.setState({catImageFilename: filename, progress: 100, isUploading: false});
        firebase
            .storage()
            .ref('images')
            .child(`${firebase.auth().currentUser.uid}/tmp/`)
            .getDownloadURL()
            .then(url => {
                this.setState({imageURL: url, showImageURL: false})
            });
    };

    handleSignOut() {
        // Sign out of Firebase.
        firebase
            .auth()
            .signOut();
        this.setState({isLoggedIn: false})
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
                    <FileUploader
                        accept="image/*"
                        name="catImageFilename"
                        randomizeFilename
                        storageRef={firebase
                        .storage()
                        .ref('images')
                        .child(`${firebase.auth().currentUser}/tmp/`)}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}/> {this.showImageURLInput()}
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

export default PostsNew;
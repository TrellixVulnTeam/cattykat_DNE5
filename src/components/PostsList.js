import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions';

class PostsList extends Component {

    componentDidMount() {
        this
            .props
            .fetchPosts();
    }

    renderPosts() {
        const posts = _.map(this.props.allPosts, (title, category, imageURL) => {
            return {
                ...title,
                ...category,
                ...imageURL
            }
        });
        if (posts) {
            return (posts.reverse()).map((post) => {
                return (
                    <li className="list-group-item" key={Math.floor((Math.random() * 1028) + 1)}>
                        <div className="text-center">
                            <img
                                style={{
                                    height: 250
                                }}
                                src={post.imageURL}
                                alt={Math.floor((Math.random() * 1028) + 1)}/>
                            <h4>
                                <strong>{post.title}</strong>
                            </h4>
                            <p>
                                {post.category}
                            </p>
                        </div>
                        <div>
                            <div>
                                Posted by:
                            </div>
                            <img
                                style={{
                                    paddingRight: 5,
                                    height: 30
                                }}
                                src={post.userPhotoURL}
                                alt={post.userDisplayName + " avatar"}/> {post.userDisplayName}
                        </div>
                    </li>
                );
            });
        }
        return <div>Loading...</div>;
    }

    render() {
        return (
            <div className="row">
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {allPosts} = state.posts;

    return {allPosts}
}

export default connect(mapStateToProps, {fetchPosts})(PostsList);

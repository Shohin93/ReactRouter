import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

import _ from 'lodash';

class PostsIndex extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this._renderPosts()}
        </ul>
      </div>
    );
  }

  _renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          {post.title}
        </li>
      );
    });
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);

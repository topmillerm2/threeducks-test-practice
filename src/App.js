import React, { Component } from "react";
import { array, func } from "prop-types";
import { connect } from "react-redux";
import { fetchPosts, createPost } from "./actions";

class App extends Component {
  static propTypes = {
    posts: array,
    fetchPosts: func,
    createPost: func,
  };

  state = { posts: [], postContent: "" };

  componentDidMount() {
    this.props.fetchPosts();
  }

  handleSubmitPost = e => {
    e.preventDefault();

    if (this.state.postContent.length === 0) return;

    this.props.createPost({ content: this.state.postContent });

    this.setState({ postContent: "" });
  };

  render() {
    return (
      <div>
        <h1>Posts:</h1>
        <ul>
          {this.props.posts.map(post => <li key={post.id}>{post.content}</li>)}
        </ul>
        <h3>Create a post:</h3>
        <form onSubmit={this.handleSubmitPost}>
          <input
            value={this.state.postContent}
            onChange={e => this.setState({ postContent: e.target.value })}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => ({ posts });

const mapDispatchToProps = { fetchPosts, createPost };

export default connect(mapStateToProps, mapDispatchToProps)(App);

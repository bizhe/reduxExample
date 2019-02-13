import React, { Component } from "react";
import { Provider } from "react-redux";
import "./App.css";

import Posts from "./components/Posts";
import PostForm from "./components/Postform";
import { createStore, applyMiddleware } from "redux";

const store = createStore(() => {}, {}, applyMiddleware());

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  componentWillMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => this.setState({ posts: data }));
  }

  render() {
    const postItems = this.state.posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
    return (
      <Provider store={store}>
        <div>
          <PostForm />
          <hr />
          <Posts />
          {postItems}
        </div>
      </Provider>
    );
  }
}

export default App;

import React from "react";
import { Provider } from "react-redux";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
} from "react-testing-library";
import "jest-dom/extend-expect";
import axios from "axios";

import { App } from "./App";

afterEach(cleanup);

// Integration tests
test("should fetch Posts when App component renders", () => {
  const posts = [
    { id: 1, content: "first post" },
    { id: 2, content: "second post" },
  ];
  const mockFetchPosts = jest.fn(() => []);

  const { container } = render(
    <App posts={posts} fetchPosts={mockFetchPosts} />,
  );

  // Expect that fetchPosts is called when component mounts
  expect(mockFetchPosts).toHaveBeenCalledTimes(1);

  // The component should 1 item for each stubbed post
  expect(container.querySelector("ul").children.length).toEqual(2);
});

test("should add a post to the list when created", async () => {
  const posts = [
    { id: 1, content: "first post" },
    { id: 2, content: "second post" },
  ];

  const newPost = { id: 3, content: "third post" };

  const mockFetchPosts = jest.fn(() => []);
  const mockCreatePost = jest.fn(() => []);

  const { container, rerender, getByLabelText } = render(
    <App
      posts={posts}
      fetchPosts={mockFetchPosts}
      createPost={mockCreatePost}
    />,
  );

  // get the form and input nodes
  const formNode = container.querySelector("form");
  const inputNode = getByLabelText("new post:");

  // change the value of the input
  inputNode.value = newPost.content;

  // fire events
  fireEvent.change(inputNode);
  fireEvent.submit(formNode);

  // check to see that this.props.createPost was called
  expect(mockCreatePost).toHaveBeenCalledTimes(1);

  // rerender the component with updated props
  rerender(
    <App
      posts={[...posts, newPost]}
      fetchPosts={mockFetchPosts}
      createPost={mockCreatePost}
    />,
  );

  expect(container.querySelector("ul").children.length).toEqual(3);
});

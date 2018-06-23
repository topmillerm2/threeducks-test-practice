import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const fetchPosts = () => async dispatch => {
  const { data } = await axios.get(`${BASE_URL}/posts`);
  dispatch({ type: "FETCH_POSTS", payload: data });
};

export const createPost = content => async dispatch => {
  const { data } = await axios.post(`${BASE_URL}/posts`, content);
  dispatch({ type: "CREATE_POST", payload: data });
};

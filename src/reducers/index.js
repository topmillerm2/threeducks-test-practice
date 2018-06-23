import { combineReducers } from "redux";

const INITIAL_STATE = [];

function postsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case "FETCH_POSTS":
      return payload;
    case "CREATE_POST":
      return [...state, payload];
    default:
      return state;
  }
}

export default combineReducers({
  posts: postsReducer,
});

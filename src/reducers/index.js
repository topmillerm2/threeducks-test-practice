import { combineReducers } from "redux";

const INITIAL_STATE = [];

function postsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  posts: postsReducer,
});

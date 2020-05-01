import { GET_POSTS, ADD_POST, RESET_NEW_FLAG } from "../actions/types";

const initialState = { posts: [], newAdded: false };

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case ADD_POST:
      return { ...state, newAdded: true };
    case RESET_NEW_FLAG:
      return { ...state, newAdded: false };
    default:
      return state;
  }
}

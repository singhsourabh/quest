import {
  GET_POSTS,
  ADD_POST,
  GET_POST_DETAIL,
  GET_RESPONSES,
  RESET_NEW_FLAG,
  RESET_POST_DETAILS,
} from "../actions/types";

const initialState = {
  posts: [],
  newAdded: false,
  postDetails: { post: null, responses: null },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case ADD_POST:
      return { ...state, newAdded: true };
    case GET_POST_DETAIL:
      return {
        ...state,
        postDetails: { ...state.postDetails, post: action.payload },
      };
    case GET_RESPONSES:
      return {
        ...state,
        postDetails: { ...state.postDetails, responses: action.payload },
      };
    case RESET_POST_DETAILS:
      return {
        ...state,
        postDetails: { post: null, responses: null },
      };
    case RESET_NEW_FLAG:
      return { ...state, newAdded: false };
    default:
      return state;
  }
}

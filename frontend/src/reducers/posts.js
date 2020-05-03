import {
  GET_POSTS,
  ADD_POST,
  GET_POST_DETAIL,
  GET_RESPONSES,
  RESET_NEW_FLAG,
  RESET_POST_DETAILS,
  ADD_RESPONSE,
  UP_DOWN_TOGGLE_POST,
} from "../actions/types";

const initialState = {
  posts: [],
  newAdded: false,
  postDetails: { post: null, responses: null },
  pagination: { current: 1 },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        pagination: { ...action.payload.pagination },
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
        postDetails: { ...state.postDetails, responses: action.payload.data },
        pagination: { ...action.payload.pagination },
      };
    case ADD_RESPONSE:
      return {
        ...state,
        postDetails: {
          ...state.postDetails,
          responses: [action.payload, ...state.postDetails.responses],
        },
        newAdded: true,
      };
    case UP_DOWN_TOGGLE_POST:
      const {
        upvote_count,
        downvote_count,
        is_upvoted,
        is_downvoted,
      } = action.payload;

      if (action.payload)
        return {
          ...state,
          posts: state.posts.map((obj) => {
            if (obj.id == action.payload.id) {
              return {
                ...obj,
                upvote_count:
                  parseInt(obj.upvote_count) + parseInt(upvote_count),
                downvote_count:
                  parseInt(obj.downvote_count) + parseInt(downvote_count),
                is_upvoted: is_upvoted,
                is_downvoted: is_downvoted,
              };
            }
            return obj;
          }),
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

import { GET_ERROR, RESET_ERROR } from "./../actions/types";
import _ from "lodash";

const initialState = {
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERROR:
      const errMsg = action.payload.detail;
      return {
        ...state,
        error: errMsg,
        scope: errMsg ? "global" : "local",
        ..._.omit(action.payload, ["detail", "scope"]),
      };
    case RESET_ERROR:
      return initialState;
    default:
      return state;
  }
}

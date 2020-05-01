import { GET_ERROR } from "./types";

export const raiseError = (errMsg, scope, ...rest) => (dispatch, getState) => {
  dispatch({
    type: GET_ERROR,
    payload: { detail: errMsg, scope, ...rest },
  });
};

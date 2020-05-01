import { GET_ERROR, RESET_ERROR } from "./types";

export const raiseError = (errMsg, scope, ...rest) => (dispatch, getState) => {
  dispatch({
    type: GET_ERROR,
    payload: { detail: errMsg, scope, ...rest },
  });
};

export const resetError = () => (dispatch, getState) => {
  dispatch({
    type: RESET_ERROR,
  });
};

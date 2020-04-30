import axios from "axios";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_ERROR,
  LOGOUT_SUCCESS,
} from "./types";

export const login = (login_id, password) => (dispatch, getState) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({ login_id, password });
  axios
    .post("/api/login", body, config)
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAIL });
      dispatch({
        type: GET_ERROR,
        payload: { ...err.response.data },
      });
    });
};

export const loadUser = () => (dispatch, getState) => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  axios
    .get("/api/user", config)
    .then((res) => {
      dispatch({ type: USER_LOADED, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: AUTH_ERROR });
    });
};

export const logout = () => (dispatch, getState) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT_SUCCESS });
};
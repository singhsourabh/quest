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

export const login = (login_id, password) => (dispatch) => {
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

export const loadUser = () => (dispatch) => {
  dispatch({ type: USER_LOADING });
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch({ type: AUTH_ERROR });
  } else {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    axios
      .get("/api/user", config)
      .then((res) => {
        dispatch({ type: USER_LOADED, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: AUTH_ERROR });
      });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT_SUCCESS });
};

export const registerUser = (username, email, password, password1) => (
  dispatch
) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({ username, email, password, password1 });
  axios
    .post("/api/register", body, config)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { ...res.data, user: res.data.username },
      });
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAIL });
      dispatch({
        type: GET_ERROR,
        payload: { ...err.response.data },
      });
    });
};

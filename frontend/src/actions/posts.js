import axios from "axios";
import {
  GET_POSTS,
  ADD_POST,
  GET_POST_DETAIL,
  GET_RESPONSES,
  GET_ERROR,
  ADD_RESPONSE,
  RESET_POST_DETAILS,
  RESET_NEW_FLAG,
  UP_DOWN_TOGGLE_POST,
} from "./types";

export const getPosts = (isAuthenticated = false, query = {}) => (dispatch) => {
  let config = {};

  if (isAuthenticated == true) {
    const token = localStorage.getItem("token");
    config = { headers: { Authorization: `Bearer ${token}` } };
  }
  config["params"] = query;
  axios
    .get("/api/posts", config)
    .then((res) => {
      const { count, next, current, previous } = res.data;
      dispatch({
        type: GET_POSTS,
        payload: {
          posts: res.data.data,
          pagination: {
            count,
            current,
            previous: previous != null ? current - 1 : null,
            next: next != null ? current + 1 : null,
          },
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERROR,
        payload: { ...err.response.data },
      });
    });
};

export const addPost = (title, details) => (dispatch) => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const data = { title, details };
  axios
    .post("/api/posts", data, config)
    .then((res) => {
      dispatch({ type: ADD_POST });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERROR,
        payload: { ...err.response.data },
      });
    });
};

export const reset_new_flag = () => (dispatch) => {
  dispatch({ type: RESET_NEW_FLAG });
};

export const getPostDetail = (
  isAuthenticated = false,
  id,
  query = {}
) => async (dispatch) => {
  let config = {},
    response;
  if (isAuthenticated == true) {
    const token = localStorage.getItem("token");
    config = { headers: { Authorization: `Bearer ${token}` } };
  }
  config["params"] = query;
  try {
    response = await axios.get(`/api/post/${id}`, config);
    dispatch({ type: GET_POST_DETAIL, payload: response.data });
    response = await axios.get(`/api/responses/${id}`, config, query);
    const { count, next, current, previous } = response.data;
    dispatch({
      type: GET_RESPONSES,
      payload: {
        data: response.data.data,
        pagination: {
          count,
          current,
          previous: previous != null ? current - 1 : null,
          next: next != null ? current + 1 : null,
        },
      },
    });
  } catch (err) {
    dispatch({ type: GET_ERROR, payload: { ...err.response.data } });
  }
};

export const resetPostDetails = () => (dispatch) => {
  dispatch({ type: RESET_POST_DETAILS });
};

export const addResponse = (id, response) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const data = { response: response };
  try {
    response = await axios.post(`/api/responses/${id}`, data, config);
    dispatch({ type: ADD_RESPONSE, payload: response.data });
  } catch (err) {
    dispatch({ type: GET_ERROR, payload: { ...err.response.data } });
  }
};

export const upDownToggle = (id, actionType, source) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const data = { id, type: actionType, content: source };
  try {
    const response = await axios.patch("/api/updown", data, config);
    dispatch({ type: UP_DOWN_TOGGLE_POST, payload: { id, ...response.data } });
  } catch (err) {
    dispatch({ type: GET_ERROR, payload: { ...err.response.data } });
  }
};

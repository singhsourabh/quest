import axios from "axios";
import {
  GET_POSTS,
  ADD_POST,
  GET_POST_DETAIL,
  GET_RESPONSES,
  GET_ERROR,
  RESET_POST_DETAILS,
  RESET_NEW_FLAG,
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
      dispatch({ type: GET_POSTS, payload: res.data.data });
    })
    .catch((err) => console.log(err.response.data));
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
      console.log(err.response.data);
      dispatch({
        type: GET_ERROR,
        payload: { ...err.response.data },
      });
    });
};

export const reset_new_flag = () => (dispatch) => {
  dispatch({ type: RESET_NEW_FLAG });
};

export const getPostDetail = (isAuthenticated = false, id) => async (
  dispatch
) => {
  let config = {},
    response;
  if (isAuthenticated == true) {
    const token = localStorage.getItem("token");
    config = { headers: { Authorization: `Bearer ${token}` } };
  }
  try {
    response = await axios.get(`/api/post/${id}`, config);
    dispatch({ type: GET_POST_DETAIL, payload: response.data });
    response = await axios.get(`/api/responses/${id}`, config);
    dispatch({ type: GET_RESPONSES, payload: response.data.data });
  } catch (err) {
    dispatch({ type: GET_ERROR, payload: { ...err.response.data } });
  }
};

export const resetPostDetails = () => (dispatch) => {
  dispatch({ type: RESET_POST_DETAILS });
};

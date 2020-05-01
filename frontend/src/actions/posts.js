import axios from "axios";
import { GET_POSTS, ADD_POST, GET_ERROR, RESET_NEW_FLAG } from "./types";

export const getPosts = (isAuthenticated = false) => (dispatch) => {
  let config = {};
  if (isAuthenticated == true) {
    const token = localStorage.getItem("token");
    config = { headers: { Authorization: `Bearer ${token}` } };
  }

  axios
    .get("/api/posts", config)
    .then((res) => {
      console.log(res.data.data);
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
      // console.log(res.data);
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

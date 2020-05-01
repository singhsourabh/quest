import axios from "axios";
import { GET_POSTS } from "./types";

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
    .catch((err) => console.log(err));
};

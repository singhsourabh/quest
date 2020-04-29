import axios from "axios";
import { GET_POSTS } from "./types";

export const getPosts = () => (dispatch) => {
  axios
    .get("/api/posts")
    .then((res) => {
      console.log(res);
      dispatch({ type: GET_POSTS, payload: res.data.data });
    })
    .catch((err) => console.log(err));
};

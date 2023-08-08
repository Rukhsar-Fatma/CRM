import axios from "axios";
import variables from "../constatnts/variables";
import toast from 'react-hot-toast';

const LOGIN = (value) => (dispatch) => {
  axios.post(variables.api_url + 'public/login', {
    email: value.user_email,
    password: value.user_password
  }).then(response => {
    console.log("🚀 ~ file: loginAction.js:12 ~ LOGIN ~ response", response.data)
    toast.success(response.data.msg);
    dispatch({
      type: "LOGIN",
      payload: {
        email: value.user_email,
        password: value.user_password
      },
      statusCode: response.data.statusCode,
      response: response.data.response[0],
      msg: response.data.msg
    });
  }).catch(error => {
    console.log("🚀 ~ file: loginAction.js:12 ~ LOGIN ~ response", error.response.data)
    toast.error(error.response.data.msg);
    dispatch({
      type: "LOGIN",
      payload: {
        email: value.user_email,
        password: value.user_password
      },
      statusCode: error.response.data.statusCode,
      response: error.response.data.response[0],
      msg: error.response.data.msg
    });
  })
};

const LOGOUT = () => (dispatch) => {
  toast.error("Logged out");
  dispatch({ type: "LOGOUT", payload: null });
};

export { LOGIN, LOGOUT };

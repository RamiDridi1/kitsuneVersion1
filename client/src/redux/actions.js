import axios from "axios";
import { ERRORS, GET_AUTH_USER, LOGIN_USER, LOGOUT_USER, REGISTER_USER, GET_USERS_SUCCESS, PROMOTE_TO_ADMIN_SUCCESS } from "./actionTypes";

export const registerUser = (formData, navigate) => async (dispatch) => {
    try {
      const res = await axios.post("http://localhost:5001/api/auth/register", formData);
      dispatch({ type: REGISTER_USER, payload: res.data, token: res.data.token });
      navigate("/Dashboard");
    } catch (err) {
      console.log(err);
      console.dir(err);
      const { errors } = err.response.data;
  
      dispatch({
        type: ERRORS,
        payload: errors
      });
    }
  };

export const loginUser = (formData, navigate) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:5001/api/auth/login", formData);
    dispatch({ type: LOGIN_USER, payload: res.data, token: res.data.token });
    navigate("/Dashboard");
  } catch (err) {
    console.log(err);
    console.dir(err);
    const { errors } = err.response.data;

    dispatch({
      type: ERRORS,
      payload: errors
    });
  }
};

export const getAuthUser = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'x-auth': localStorage.getItem('token'),
      }
    };

    const res = await axios.get("http://localhost:5001/api/auth/user", config);
    dispatch({
      type: GET_AUTH_USER,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER
  });
};

export const getUsersSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  payload: users,
});

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5001/api/auth/all-users');
    dispatch(getUsersSuccess(res.data));
  } catch (error) {
    console.error('Error getting users:', error);
    dispatch({ type: ERRORS });
  }
};

export const promoteToAdminSuccess = (userId) => ({
  type: PROMOTE_TO_ADMIN_SUCCESS,
  payload: userId,
});

export const promoteToAdmin = (userId) => async (dispatch) => {
  try {
    const res = await axios.put(`http://localhost:5001/api/auth/set-admin/${userId}`);
    dispatch(promoteToAdminSuccess(userId));
  } catch (error) {
    console.error('Error:', error);
    dispatch({ type: ERRORS, payload: error });
  }
}; 


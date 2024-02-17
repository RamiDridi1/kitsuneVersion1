// redux/authReducer.js
import { GET_AUTH_USER, LOGOUT_USER, LOGIN_USER, ERRORS, GET_USERS_SUCCESS, PROMOTE_TO_ADMIN_SUCCESS, REGISTER_USER } from './actionTypes';

const initState = {
  token: localStorage.getItem("token"),
  user: null,
  isAuth: false,
  err: null,
  users: [], // Initialize with an empty array for the list of users
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case REGISTER_USER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        isAuth: true,
        err: null
      };
    case GET_AUTH_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuth: false,
        user: null
      };
    case ERRORS:
      return {
        ...state,
        err: action.payload,
        isAuth: false,
        user: null
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
      case PROMOTE_TO_ADMIN_SUCCESS:
        const updatedUsers = state.users.map((user) =>
          user._id === action.payload ? { ...user, role: 'admin' } : user
        );
      
        return {
          ...state,
          users: updatedUsers,
          user: state.user && state.user._id === action.payload ? { ...state.user, role: 'admin' } : state.user,
        };
    default:
      return state;
  }
};

export default authReducer;





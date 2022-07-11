import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOG_OUT,
  USER_AUTH,
} from "../actions/actionType";

const INITIAL_STATE = {
  user: null,
  token: null,
  isAuthenticated: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // localStorage.setItem("user", JSON.stringify(action.payload.user));
      // localStorage.setItem("token", JSON.stringify(action.payload.accessToken));
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.user.accessToken,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case USER_AUTH:
    case LOG_OUT:
      // localStorage.removeItem("user");
      // localStorage.removeItem("token");
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.user.accessToken,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default userReducer;

import {
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT
} from "../actions/authActionTypes";

const initialState = {};

export default (state = initialState, action) => {
  console.log(
    `%c${action.type}`,
    "background: #000; color: #22edfc; padding: 4px"
  );
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthorized: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthorized: true
      };
    case LOGOUT:
      return {
        ...state,
        isAuthorized: false
      };
    default:
      return state;
  }
};

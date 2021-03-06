import { call, put, takeLatest } from "redux-saga/effects";

import axios from "../../../core/http";
import {
  UPDATE_EMAIL_REQUEST,
  UPDATE_EMAIL_FAILURE,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_USERNAME_REQUEST,
  UPDATE_USERNAME_FAILURE,
  UPDATE_USERNAME_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_SUCCESS
} from "../actions/settingsActionTypes";

function updateEmailApi(email) {
  return axios.put("/myself/updateEmail", email);
}

function updateUsernameApi(username) {
  return axios.put("/myself/updateUsername", username);
}

function updatePasswordApi(data) {
  return axios.put("/myself/updatePassword", data);
}

function* updateEmail(action) {
  try {
    const { setStatus } = action.meta;
    const data = yield call(updateEmailApi, action.payload);
    const { email } = data.data;

    yield put({ type: UPDATE_EMAIL_SUCCESS, payload: email });
    setStatus({ message: "Email updated" });
  } catch (error) {
    const { setFieldError } = action.meta;

    if (error && error.data) {
      const { message } = error.data;

      switch (message) {
        case "EmailExistsException":
          setFieldError("email", "Email has already been taken.");
          break;
        default:
          setFieldError("general", "Something went wrong");
      }
    } else {
      setFieldError("general", "No response from server");
    }
    yield put({ type: UPDATE_EMAIL_FAILURE, error });
  } finally {
    const { setSubmitting } = action.meta;

    setSubmitting(false);
  }
}

function* updateUsername(action) {
  try {
    const { setStatus } = action.meta;
    const data = yield call(updateUsernameApi, action.payload);
    const { username } = data.data;

    yield put({ type: UPDATE_USERNAME_SUCCESS, payload: username });
    setStatus({ message: "Username updated" });
  } catch (error) {
    const { setFieldError } = action.meta;

    if (error && error.data) {
      const { message } = error.data;

      switch (message) {
        case "UsernameExistsException":
          setFieldError("username", "Username has already been taken.");
          break;
        default:
          setFieldError("general", "Something went wrong");
      }
    } else {
      setFieldError("general", "No response from server");
    }
    yield put({ type: UPDATE_USERNAME_FAILURE, error });
  } finally {
    const { setSubmitting } = action.meta;

    setSubmitting(false);
  }
}

function* updatePassword(action) {
  try {
    const { resetForm, setStatus } = action.meta;

    yield call(updatePasswordApi, action.payload);
    yield put({ type: UPDATE_PASSWORD_SUCCESS });
    resetForm();
    setStatus({ message: "Password updated" });
  } catch (error) {
    const { setFieldError } = action.meta;

    if (error && error.data) {
      const { message } = error.data;

      switch (message) {
        case "NotAuthorizedException":
          setFieldError("currentPassword", "Incorrect password.");
          break;
        case "PasswordsNotMatchingException":
          setFieldError("confirmPassword", "Passwords do not match.");
          break;
        default:
          setFieldError("general", "Something went wrong");
      }
    } else {
      setFieldError("general", "No response from server");
    }
    yield put({ type: UPDATE_PASSWORD_FAILURE, error });
  } finally {
    const { setSubmitting } = action.meta;

    setSubmitting(false);
  }
}

const saga = function*() {
  yield takeLatest(UPDATE_EMAIL_REQUEST, updateEmail);
  yield takeLatest(UPDATE_USERNAME_REQUEST, updateUsername);
  yield takeLatest(UPDATE_PASSWORD_REQUEST, updatePassword);
};

export default saga;

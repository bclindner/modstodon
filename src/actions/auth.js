import {
  authorize as _authorize,
  revoke as _revoke
} from "react-native-app-auth";

import {
  registerApp as _registerApp,
  getAccessToken as _getAccessToken,
  appAuthConfig
} from "../utils/API";

import { clearReports } from "./reports";

/**
 * Register an app with Modstodon, removing the previous signed-in instance.
 */
export const registerApp = instanceURL => async dispatch => {
  // Signal that credentials are being loaded
  dispatch(requestAppCredentials(instanceURL));
  try {
    // Register the application and send the ID and secret to the store
    const { client_id, client_secret } = await _registerApp(instanceURL);
    dispatch(receiveAppCredentials(instanceURL, client_id, client_secret));
  } catch (err) {
    // Signal error in the store
    dispatch(oauthError(err));
  }
};

export const REQUEST_APP_CREDENTIALS = "auth/REQUEST_APP_CREDENTIALS";
export const requestAppCredentials = () => ({
  type: REQUEST_APP_CREDENTIALS
});

export const RECEIVE_APP_CREDENTIALS = "auth/RECEIVE_APP_CREDENTIALS";
export const receiveAppCredentials = (
  instanceURL,
  client_id,
  client_secret
) => ({
  type: RECEIVE_APP_CREDENTIALS,
  instanceURL,
  client_id,
  client_secret
});

export const authorize = () => async (dispatch, getState) => {
  dispatch(requestAuthorize());
  try {
    const { client_id, client_secret, instanceURL } = getState().auth;
    const result = await _authorize(
      appAuthConfig(instanceURL, client_id, client_secret)
    );
    dispatch(receiveAuthorize(result.accessToken));
  } catch (err) {
    console.error(err);
    dispatch(oauthError(err));
  }
};

export const REQUEST_AUTHORIZE = "auth/REQUEST_AUTHORIZE";
export const requestAuthorize = () => ({
  type: REQUEST_AUTHORIZE
});

export const RECEIVE_AUTHORIZE = "auth/RECEIVE_AUTHORIZE";
export const receiveAuthorize = access_token => ({
  type: RECEIVE_AUTHORIZE,
  access_token
});

export const revoke = () => async (dispatch, getState) => {
  dispatch(requestRevoke());
  try {
    const {
      client_id,
      client_secret,
      instanceURL,
      access_token
    } = getState().auth;
    await _revoke(appAuthConfig(instanceURL, client_id, client_secret), {
      tokenToRevoke: access_token
    });
    dispatch(clearReports());
    dispatch(receiveRevoke());
  } catch (err) {
    console.error(err);
    dispatch(oauthError(err));
  }
};

export const REQUEST_REVOKE = "auth/REQUEST_REVOKE";
export const requestRevoke = () => ({
  type: REQUEST_REVOKE
});

export const RECEIVE_REVOKE = "auth/RECEIVE_REVOKE";
export const receiveRevoke = () => ({
  type: RECEIVE_REVOKE
});

export const OAUTH_ERROR = "auth/OAUTH_ERROR";
export const oauthError = error => ({
  type: OAUTH_ERROR,
  error: error.toString()
});

export const CLEAR_ERROR = "auth/CLEAR_ERROR";
export const clearError = () => ({
  type: CLEAR_ERROR
});

import { authorize as _authorize } from "react-native-app-auth";
import url from "url";

import {
  registerApp as _registerApp,
  getAccessToken as _getAccessToken,
  OAUTH_SCOPES,
  OAUTH_REDIRECT_URI
} from "../utils/API";

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
    const result = await _authorize({
      clientId: client_id,
      clientSecret: client_secret,
      redirectUrl: OAUTH_REDIRECT_URI,
      scopes: OAUTH_SCOPES,
      serviceConfiguration: {
        authorizationEndpoint: url.resolve(instanceURL, '/oauth/authorize'),
        tokenEndpoint: url.resolve(instanceURL, '/oauth/token')
      },
      useNonce: false,
      usePKCE: false
    });
    dispatch(receiveAuthorize(result.accessToken));
  } catch (err) {
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

export const OAUTH_ERROR = "auth/OAUTH_ERROR";
export const oauthError = error => ({
  type: OAUTH_ERROR,
  error: error.toString()
});

export const CLEAR_ERROR = "auth/CLEAR_ERROR";
export const clearError = () => ({
  type: CLEAR_ERROR
});

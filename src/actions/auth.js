import {
  registerApp as _registerApp,
  getAccessToken as _getAccessToken
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
    console.error(err)
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

export const getAccessToken = code => async (dispatch, getState) => {
  dispatch(requestAccessToken());
  try {
    const { client_id, client_secret, instanceURL } = getState().auth;
    const { access_token } = await _getAccessToken(
      instanceURL,
      client_id,
      client_secret,
      code
    );
    console.log(access_token)
    dispatch(receiveAccessToken(access_token));
  } catch (err) {
    console.error(err)
    dispatch(oauthError(err));
  }
};

export const REQUEST_ACCESS_TOKEN = "auth/REQUEST_ACCESS_TOKEN";
export const requestAccessToken = () => ({
  type: REQUEST_APP_CREDENTIALS
});

export const RECEIVE_ACCESS_TOKEN = "auth/RECEIVE_ACCESS_TOKEN";
export const receiveAccessToken = access_token => ({
  type: RECEIVE_ACCESS_TOKEN,
  access_token
});

export const OAUTH_ERROR = "auth/OAUTH_ERROR";
export const oauthError = error => ({
  type: OAUTH_ERROR,
  error
});

export const CLEAR_ERROR = "auth/CLEAR_ERROR";
export const clearError = () => ({
  type: CLEAR_ERROR
});

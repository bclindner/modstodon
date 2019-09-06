import {
  REQUEST_APP_CREDENTIALS,
  RECEIVE_APP_CREDENTIALS,
  REQUEST_AUTHORIZE,
  RECEIVE_AUTHORIZE,
  OAUTH_ERROR,
  CLEAR_ERROR
} from "../actions/auth";

const initialState = {
  instanceURL: "",
  client_id: "",
  client_secret: "",
  access_token: "",
  error: "",
  loading: false
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_APP_CREDENTIALS:
      return {
        instanceURL: action.instanceURL,
        client_id: action.client_id,
        client_secret: action.client_secret,
        access_token: "",
        error: "",
        loading: false
      };
    case RECEIVE_AUTHORIZE:
      return {
        ...state,
        access_token: action.access_token,
        error: "",
        loading: false
      };
    case OAUTH_ERROR:
      return {
        ...state,
        error: action.error.toString(),
        loading: false
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: ""
      };
    case REQUEST_APP_CREDENTIALS:
    case REQUEST_AUTHORIZE:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

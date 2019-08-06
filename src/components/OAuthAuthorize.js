import React from "react";
import { WebView } from "react-native-webview";
import PT from "prop-types";
import url from "url";
import qs from "querystring";

import { OAUTH_REDIRECT_URI, OAUTH_SCOPES } from "../utils/API";

/**
 * Simple WebView component which walks the user through OAuth authorization.
 */
const OAuthAuthorize = ({
  handleAuthCode,
  client_id,
  instanceURL,
  navigation
}) => {
  if (client_id && instanceURL) {
    return (
      <WebView
        onNavigationStateChange={async nav => {
          if (nav.url.startsWith(OAUTH_REDIRECT_URI)) {
            const code = url.parse(nav.url, true).query.code;
            handleAuthCode(code);
            navigation.navigate("AuthLoading");
            return false;
          }
        }}
        source={{
          uri: url.resolve(
            instanceURL,
            "/oauth/authorize?" +
            qs.stringify({
              client_id,
              response_type: "code",
              redirect_uri: OAUTH_REDIRECT_URI,
              scope: OAUTH_SCOPES
            })
          )
        }}
      />
    )
  } else {
    return null
  }
}
OAuthAuthorize.propTypes = {
  // Instance URL to go to for authorization.
  instanceURL: PT.string.isRequired,
  // OAuth client ID.
  client_id: PT.string.isRequired,
  // Function to send code to.
  handleAuthCode: PT.func.isRequired,
  // React Navigation's "navigation" prop.
  navigation: PT.object.isRequired
};

export default OAuthAuthorize;

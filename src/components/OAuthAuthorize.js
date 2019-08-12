import React from "react";
import { View } from "react-native";
import { Headline, Caption, ActivityIndicator } from "react-native-paper";
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
  error,
  loading,
  navigation
}) => {
  if (client_id && instanceURL && !error && !loading) {
    return (
      <WebView
        ref={ref => {
          this.webview = ref;
        }}
        onNavigationStateChange={async nav => {
          if (nav.url.startsWith(OAUTH_REDIRECT_URI)) {
            const code = url.parse(nav.url, true).query.code;
            handleAuthCode(code);
            this.webview.stopLoading();
            navigation.navigate("App");
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
    );
  } else if (error && !loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Headline>Error!</Headline>
        <Caption>Failed authorization - bad instance URL?</Caption>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }
};
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

import React, { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Linking } from "react-native";
import { Portal, Dialog, Paragraph, TextInput, Button, Headline } from "react-native-paper";
import { parse as parseURL } from "url"; // url
import {
  MALICIOUS_INSTANCE_REDIRECT_URL,
  MALICIOUS_INSTANCES
} from "../utils/constants";

/**
 * Checks if a URL looks like a valid Mastodon instance URL.
 * @param {string} urlString The URL to test, in string form.
 */
const urlValid = urlString => {
  try {
    const url = parseURL(urlString);
    // no way i'm letting someone connect without tls. sorry
    if (url.protocol !== "https:") {
      return false;
    }
    // as far as i know mastodon instances can not be hosted on paths of domains
    if (url.pathname !== "/") {
      return false;
    }
    // everything else should be fine at this point
    return true;
  } catch (err) {
    // can't be valid if it can't be parsed :rollsafe:
    return false;
  }
};

/**
 * Checks if a URL is that of a malicious instance.
 * @param {string} urlString URL string to test.
 */
const urlSucks = testedURLString => {
  const testedURL = parseURL(testedURLString);
  for (maliciousHostname of MALICIOUS_INSTANCES) {
    if (testedURL.hostname === maliciousHostname) {
      return true;
    }
  }
  return false;
};

export default InstanceURLDialog = ({
  registerApp,
  authorize,
  clientId,
  hasToken,
  clearError,
  errored,
  navigation
}) => {
  const [valid, setValid] = useState(false);
  const [instanceURL, setInstanceURL] = useState("");
  // Re-validate instance URL on change
  useEffect(() => {
    setValid(urlValid(instanceURL));
  }, [instanceURL]);
  // Authorize if app credentials have been received
  useEffect(() => {
    if (clientId) {
      authorize();
    }
  }, [clientId]);
  // Navigate to the app proper if authenticated
  useEffect(() => {
    if (hasToken) {
      navigation.navigate("App");
    }
  }, [hasToken]);

  login = () => {
    if (urlValid(instanceURL)) {
      if (urlSucks(instanceURL)) {
        Linking.openURL(MALICIOUS_INSTANCE_REDIRECT_URL); // yeet
      } else {
        registerApp(instanceURL);
      }
    }
  };
  return (
    <KeyboardAvoidingView style={styles.root} behavior="height">
      <Portal>
        <Dialog visible={errored}>
          <Dialog.Title>
            Error
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph>Something broke. Hit OK to clear the error.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={clearError}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={styles.container}>
        <Headline style={styles.title}>Authentication</Headline>
        <Paragraph>Please enter your instance's URL (with https://)</Paragraph>
        <TextInput
          style={styles.input}
          label="Instance URL"
          error={!valid}
          onChangeText={setInstanceURL}
          onSubmitEditing={login}
        />
        <Button onPress={login}>Authenticate</Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 8
  },
  container: {
    width: "100%"
  },
  title: {
    textAlign: "center"
  },
  input: {
    height: 60,
    marginBottom: 4
  }
});

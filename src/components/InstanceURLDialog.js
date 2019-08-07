import React, { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Paragraph, TextInput, Button, Headline } from "react-native-paper";

const urlRegex = /^https:\/\/[A-Za-z0-9\-]+\.[A-Za-z]{2,}\/?$/;
const urlValid = url => urlRegex.test(url);

export default InstanceURLDialog = ({ registerApp, navigation }) => {
  const [valid, setValid] = useState(false);
  const [instanceURL, setInstanceURL] = useState("");
  useEffect(() => {
    setValid(urlValid(instanceURL));
  }, [instanceURL]);

  login = () => {
    if (urlValid(instanceURL)) {
      registerApp(instanceURL);
      navigation.navigate("OAuthAuthorize", {
        instanceURL
      });
    }
  };
  return (
    <KeyboardAvoidingView style={styles.root} behavior="height">
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

// export default class InstanceURLDialog extends React.Component {
//   state = {
//     value: "",
//     valid: false
//   };
//
//   updateValue = value =>
//     this.setState(state => ({ ...state, value, valid: urlValid(value) }));
//
//   login = () => {
//     if (urlValid(this.state.value)) {
//       this.props.registerApp(this.state.value)
//       this.props.navigation.navigate("OAuthAuthorize", {
//         instanceURL: this.state.value
//       });
//     }
//   };
//
//   render() {
//     return (
//       <KeyboardAvoidingView style={styles.root} behavior="height">
//         <View style={styles.container}>
//           <Headline style={styles.title}>Authentication</Headline>
//           <Paragraph>
//             Please enter your instance's URL (with https://)
//           </Paragraph>
//           <TextInput
//             style={styles.input}
//             label="Instance URL"
//             error={!this.state.valid}
//             onChangeText={this.updateValue}
//             onSubmitEditing={this.login}
//           />
//           <Button onPress={this.login}>Authenticate</Button>
//         </View>
//       </KeyboardAvoidingView>
//     );
//   }
// }

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

import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Portal,
  Dialog,
  Paragraph,
  TextInput,
  Button
} from "react-native-paper";

const ModActionModal = ({
  visible,
  actionName,
  message,
  onDismiss,
  onConfirm
}) => {
  [value, setValue] = useState("");
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Confirm Action</Dialog.Title>
        <Dialog.Content>
          {message ? (
            <>
              <Paragraph>Input a message to the user, if desired:</Paragraph>
              <TextInput
                mode="outlined"
                multiline
                numberOfLines={4}
                onChangeText={useState}
              />
            </>
          ) : (
            <Paragraph>Do you wish to {actionName} this user? </Paragraph>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => onConfirm(value)}
          >
            Confirm
          </Button>
          <Button style={styles.button} onPress={() => onDismiss()}>
            Cancel
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
ModActionModal.defaultProps = {
  visible: false,
  actionName: "...",
  message: false,
  onDismiss: () => false,
  onConfirm: message => false || message // lol
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 4,
    marginRight: 4
  }
});

export default ModActionModal;

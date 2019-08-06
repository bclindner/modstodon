import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  Card,
  Paragraph,
  Button,
  DataTable,
  Subheading,
  Caption
} from "react-native-paper";

import Post from "../components/Post";
import ModActionModal from "../components/ModActionModal";

const defaultModDialogProps = {
  visible: false,
  actionName: "...",
  message: false,
  onConfirm: () => null
};

export default class Report extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Report #" + navigation.state.params.reportID
  });

  state = {
    status: "loading",
    errorMessage: "",
    report: {},
    dialog: defaultModDialogProps
  };

  clearAction = () =>
    this.setState(state => ({ ...state, dialog: defaultModDialogProps }));

  stageAction = type => {
    let dialog = {};
    switch (type) {
      case "warn":
        dialog = {
          visible: true,
          actionName: "warn",
          message: true,
          onConfirm: msg =>
            this.props.performAction(
              "none",
              this.props.report.target_account.account.id,
              this.props.report.id,
              msg
            )
        };
        break;
      case "disable":
        dialog = {
          visible: true,
          actionName: "disable",
          message: false,
          onConfirm: () =>
            this.props.performAction(
              "disable",
              this.props.report.target_account.account.id,
              this.props.report.id
            )
        };
        break;
      case "silence":
        dialog = {
          visible: true,
          actionName: "silence",
          message: false,
          onConfirm: () =>
            this.props.performAction(
              "silence",
              this.props.report.target_account.account.id,
              this.props.report.id
            )
        };
        break;
      case "suspend":
        dialog = {
          visible: true,
          actionName: "suspend",
          message: true,
          onConfirm: msg =>
            this.props.performAction(
              "suspend",
              this.props.report.target_account.account.id,
              this.props.report.id,
              msg
            )
        };
        break;
      default:
        dialog = defaultModDialogProps;
        break;
    }
    this.setState(state => ({ ...state, dialog }));
  };

  performAction = async (
    type,
    text = undefined,
    sendEmailNotification = undefined
  ) => {
    await takeAction(type, text, sendEmailNotification);
    this.props.navigation.goBack();
  };

  render() {
    const { dialog } = this.state;
    const { report } = this.props
    return (
      <View style={styles.root}>
        <ScrollView style={styles.report}>
          <DataTable>
            <DataTable.Row>
              <DataTable.Title>Reported account</DataTable.Title>
              <DataTable.Cell>
                @{report.target_account.account.acct}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Title>Reported by</DataTable.Title>
              <DataTable.Cell>
                @{report.account.account.acct}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Title>Status</DataTable.Title>
              <DataTable.Cell>
                {report.action_taken ? "Resolved" : "Unresolved"}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
          <Subheading>Reason:</Subheading>
          <Card.Content>
            <Paragraph>{report.comment}</Paragraph>
            <Caption>Reported on {report.created_at}</Caption>
          </Card.Content>
          {report.statuses.length > 0 && (

            <>
              <Subheading>Reported posts:</Subheading>
              {report.statuses.map(status => (
                <Post data={status} key={status.id} />
              ))}
            </>
          )}
          <View style={styles.reportActions}>
            {report.actionTaken && (
              <>
                <Button
                  mode="contained"
                  style={styles.reportAction}
                  onPress={() => this.stageAction("warn")}
                >
                  Warn
                    </Button>
                <Button
                  mode="contained"
                  style={styles.reportAction}
                  onPress={() => this.stageAction("disable")}
                >
                  Disable
                    </Button>
                <Button
                  mode="contained"
                  style={styles.reportAction}
                  onPress={() => this.stageAction("silence")}
                >
                  Silence
                    </Button>
                <Button
                  mode="contained"
                  style={styles.reportAction}
                  onPress={() => this.stageAction("suspend")}
                >
                  Suspend
                    </Button>
              </>
            )}
          </View>
        </ScrollView>
        <ModActionModal {...dialog} onDismiss={this.clearAction} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  report: {
    margin: 4,
    padding: 4
  },
  reportActions: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 4
  },
  reportAction: {
    marginTop: 4,
    marginBottom: 4
  }
});

import React from "react";
import { StyleSheet, View, ScrollView, Linking } from "react-native";
import {
  Card,
  Paragraph,
  Button,
  DataTable,
  Subheading,
  Caption,
  Headline
} from "react-native-paper";

import Post from "../components/Post";
import ModActionModal from "../components/ModActionModal";

const defaultModDialogProps = {
  visible: false,
  message: "...",
  actionName: "...",
  allowInput: false,
  onConfirm: () => null
};

export default class Report extends React.Component {
  static navigationOptions = {
    title: "Report"
  };

  state = {
    dialog: defaultModDialogProps
  };

  clearAction = () =>
    this.setState(state => ({ ...state, dialog: defaultModDialogProps }));

  stageAction = type => {
    let dialog = {};
    switch (type) {
      case "resolve":
        dialog = {
          visible: true,
          message: "Are you sure you want to mark this report as resolved?",
          actionName: "",
          allowInput: true,
          onConfirm: msg => this.performAction("none")
        };
        break;
      case "warn":
        dialog = {
          visible: true,
          message: "",
          actionName: "warn",
          allowInput: true,
          onConfirm: msg => this.performAction("none", msg)
        };
        break;
      case "disable":
        dialog = {
          visible: true,
          message: "",
          actionName: "disable",
          allowInput: false,
          onConfirm: () => this.performAction("disable")
        };
        break;
      case "silence":
        dialog = {
          visible: true,
          message: "",
          actionName: "silence",
          allowInput: false,
          onConfirm: () => this.performAction("silence")
        };
        break;
      case "suspend":
        dialog = {
          visible: true,
          message: "",
          actionName: "suspend",
          allowInput: true,
          onConfirm: msg => this.performAction("suspend", msg)
        };
        break;
      default:
        dialog = defaultModDialogProps;
        break;
    }
    this.setState(state => ({ ...state, dialog }));
  };

  performAction = async (type, text, sendEmailNotification) => {
    await this.props.performAction(
      this.props.report.target_account.account.id,
      type,
      this.props.report.id,
      text,
      sendEmailNotification
    );
    this.props.navigation.goBack();
  };

  render() {
    const { dialog } = this.state;
    const { report } = this.props;
    if (!report) {
      return null;
    }
    return (
      <View style={styles.root}>
        <ScrollView style={styles.report}>
          <Headline>Report #{report.id}</Headline>
          <DataTable>
            <DataTable.Row>
              <DataTable.Title>Reported account</DataTable.Title>
              <DataTable.Cell>
                <Paragraph
                  onPress={() =>
                    Linking.openURL(report.target_account.account.url)
                  }
                  style={styles.link}
                >
                  @{report.target_account.account.acct}
                </Paragraph>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Title>Reported by</DataTable.Title>
              <DataTable.Cell>
                <Paragraph
                  onPress={() => Linking.openURL(report.account.account.url)}
                  style={styles.link}
                >
                  @{report.account.account.acct}
                </Paragraph>
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
            {!report.action_taken && (
              <>
                <Button
                  mode="contained"
                  style={styles.reportAction}
                  onPress={() => this.stageAction("resolve")}
                >
                  Mark As Resolved
                </Button>
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
  },
  link: {
    color: "#0000FF",
    textDecorationLine: "underline"
  }
});

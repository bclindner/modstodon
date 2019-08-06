import React from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";
import { Headline, Caption, Appbar } from "react-native-paper";

import ReportCard from "../components/ReportCard";

export default class ReportList extends React.Component {
  static navigationOptions = {
    title: "Reports",
    headerRight: (
      <>
        <Appbar.Action icon="eject" title="Logout" />
      </>
    )
  };

  state = {
    refreshing: false
  };

  reloadReports = async () => {
    this.setState(state => ({ ...state, refreshing: true }));
    await this.props.getMoreReports({ reload: true })
    this.setState(state => ({ ...state, refreshing: false }))
  };

  componentDidMount() {
    this.refreshReports();
  }

  render() {
    return (
      <FlatList
        contentContainerStyle={styles.report}
        data={this.props.reports}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.reloadReports}
          />
        }
        keyExtractor={report => report.id + "_reportcard"}
        renderItem={report => (
          <ReportCard
            onPress={id =>
              this.props.navigation.navigate("Report", { reportID: id })
            }
            report={report}
          />
        )}
        ListEmptyComponent={
          <>
            <Headline style={styles.noreports}>No reports!</Headline>
            <Caption style={styles.noreports}>Pull to refresh</Caption>
          </>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  report: {
    padding: 4
  },
  noreports: {
    textAlign: "center",
    paddingTop: 16
  }
});

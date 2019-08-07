import React from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";
import { Headline, Caption, Appbar } from "react-native-paper";

import ReportCard from "../components/ReportCard";

const ReportList = ({
  refreshing,
  reports,
  getReports,
  clearReports,
  selectReport,
  navigation
}) => {
  const openReport = id => {
    selectReport(id);
    navigation.navigate("Report");
  }
  return (
    <FlatList
      contentContainerStyle={styles.report}
      data={reports}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            clearReports(); // sync
            getReports(); // async
            // should be safe
          }}
        />
      }
      keyExtractor={report => report.id + "_reportcard"}
      renderItem={report => (
        <ReportCard
          onPress={() => openReport(report.index)}
          report={report}
        />
      )}
      ListEmptyComponent={!refreshing &&
        <>
          <Headline style={styles.noreports}>No reports!</Headline>
          <Caption style={styles.noreports}>Pull to refresh</Caption>
        </>
      }
      onEndReachedThreshold={0.6}
      onEndReached={() => getReports(reports[reports.length - 1].id)}
    />
  );
};
ReportList.navigationOptions = {
  title: "Reports",
  headerRight: (
    <>
      <Appbar.Action icon="eject" title="Logout" />
    </>
  )
};

const styles = StyleSheet.create({
  report: {
    padding: 4
  },
  noreports: {
    textAlign: "center",
    paddingTop: 16
  }
});

export default ReportList;

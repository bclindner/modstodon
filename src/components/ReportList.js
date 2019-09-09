import React, { useState, useEffect } from "react";
import moment from "moment";
import { StyleSheet, FlatList, RefreshControl } from "react-native";
import { Appbar, Headline, Caption, Portal, Dialog, Button, Paragraph } from "react-native-paper";

import ReportCard from "../components/ReportCard";

const ReportList = ({
  refreshing,
  reports,
  lastUpdated,
  getReports,
  clearReports,
  selectReport,
  logout,
  navigation
}) => {
  // Get reports and set navigation props when mounted
  useEffect(() => {
    getReports()
    navigation.setParams({"logout": logout})
  }, [])
  const [modalActive, setModalActive] = useState(true) 
  const openReport = id => {
    selectReport(id);
    navigation.navigate("Report");
  };
  const lastUpdatedMoment = moment(lastUpdated)
  return (
    <>
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
        <ReportCard onPress={() => openReport(report.index)} report={report} />
      )}
      ListEmptyComponent={
        !refreshing && (
          <>
            <Headline style={styles.noreports}>No reports!</Headline>
            <Caption style={styles.noreports}>
              Last updated {lastUpdatedMoment.format("MMM D h:mm a")}
            </Caption>
            <Caption style={styles.noreports}>Pull to refresh</Caption>
          </>
        )
      }
      onEndReachedThreshold={0.6}
      onEndReached={() => getReports(reports[reports.length - 1].id)}
    />
    <Portal>
      <Dialog visible={modalActive} onDismiss={() => setModalActive(false)}>
        <Dialog.Title>Log out?</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            Are you sure you want to log out?
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => logout()}
          >
            Log Out
          </Button>
          <Button style={styles.button} onPress={() => setModalActive(false)}>
            Cancel
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
    </>
  );
};
ReportList.navigationOptions = ({ navigation }) => ({
  title: "Reports",
  headerRight: (
    <Appbar.Action icon="power" accessibilityLabel="Logout" onPress={() => navigation.getParam('logout')()}/>
  )
});

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

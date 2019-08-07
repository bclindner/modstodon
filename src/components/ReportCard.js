import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Paragraph, Avatar, Caption } from "react-native-paper";
import moment from "moment";

const ReportCard = ({ report, onPress }) => (
  <Card
    key={report.id + "-reportcard"}
    elevation={2}
    style={styles.reportCard}
    onPress={() => onPress(report.item.id)}
  >
    <Card.Title
      title={report.item.target_account.account.acct}
      subtitle={`Report #${report.item.id}`}
    />
    <Card.Content>
      <View style={styles.reportAvatar}>
        <View>
          <Avatar.Image
            source={{ uri: report.item.target_account.account.avatar }}
          />
        </View>
        <View style={styles.reportContent}>
          <Paragraph style={styles.truncate}>{report.item.comment}</Paragraph>
          <Caption>Reported by {report.item.account.account.acct}</Caption>
          <Caption>
            ({moment(report.item.created_at, moment.ISO_8601).format("llll")})
          </Caption>
        </View>
      </View>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  reportCard: {
    margin: 8
  },
  reportAvatar: {
    flex: 1,
    flexDirection: "row"
  },
  reportContent: {
    flex: 1,
    paddingLeft: 8
  },
  truncate: {
    flex: 1
  }
});

export default ReportCard;

import React from "react";
import { StyleSheet, Linking } from "react-native";
import {
  Card,
  Paragraph,
  // Button,
  Caption,
  ToggleButton
} from "react-native-paper";
import HTMLView from "react-native-htmlview";
import moment from "moment";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCW: true
    };
  }
  toggleCW = () =>
    this.setState(state => ({ ...state, showCW: !state.showCW }));

  componentDidMount() {
    if (this.props.data.sensitive || this.props.data.spoiler_text) {
      this.setState({ showCW: false });
    }
  }

  render() {
    const { showCW } = this.state;
    const { data } = this.props;
    return (
      <Card elevation={2} style={styles.card}>
        <Card.Content>
          <Paragraph styles={styles.cw}>
            {data.spoiler_text && `CW: ${data.spoiler_text}`}
          </Paragraph>
          {showCW && <HTMLView value={data.content} />}
          <Caption>
            {moment(data.created_at, moment.ISO_8601).fromNow()} -{" "}
            {data.visibility}
          </Caption>
          {data.media_attachments.length > 0 ? (
            <View>
              <Paragraph>Attachments:</Paragraph>
              {data.media_attachments.map(att => (
                <Caption>
                  Attachment ({att.type}):{" "}
                  <Text
                    style={styles.link}
                    onPress={() => Linking.openURL(att.url)}
                  >
                    [link]
                  </Text>
                </Caption>
              ))}
            </View>
          ) : (
            <Caption>No attachments</Caption>
          )}
        </Card.Content>
        {/*
         */}
        <Card.Actions>
          {// For some reason I have to use a ternary here and specify null to get this to not throw an error.
          data.spoiler_text ? (
            <ToggleButton
              icon={showCW ? "visibility" : "visibility-off"}
              value={showCW ? "visibility" : "visibility-off"}
              status={showCW}
              onPress={this.toggleCW}
            />
          ) : null}
          {/*
          This is not usable right now
          <Button mode="outlined" style={styles.cardButton} disabled>
            Mark
          </Button>
          <Button mode="outlined" style={styles.cardButton} disabled>
            Unmark
          </Button>
          <Button mode="outlined" style={styles.cardButton} disabled>
            Delete
          </Button>
          */}
        </Card.Actions>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginTop: 4,
    marginBottom: 4
  },
  cardButton: {
    margin: 2
  },
  cw: {
    fontWeight: "bold"
  },
  link: {
    color: "#0000FF",
    textDecorationLine: "underline"
  }
});

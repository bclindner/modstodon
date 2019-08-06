import React from "react";
import { StyleSheet } from "react-native";
import {
  Card,
  Paragraph,
  Button,
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
    console.log(data);
    return (
      <Card elevation={2} style={styles.card}>
        <Card.Content>
          {data.spoiler_text && (
            <Paragraph style={styles.cw}>CW: {data.spoiler_text}</Paragraph>
          )}
          {showCW && <HTMLView value={data.content} />}
          <Caption>
            {moment(data.created_at, moment.ISO_8601).fromNow()} - {data.visibility}
          </Caption>
        </Card.Content>
        <Card.Actions>
          <ToggleButton
            icon={showCW ? "visibility" : "visibility-off"}
            value={showCW ? "visibility" : "visibility-off"}
            status={showCW}
            onPress={this.toggleCW}
          />
          <Button mode="outlined" style={styles.cardButton} disabled>
            Mark
          </Button>
          <Button mode="outlined" style={styles.cardButton} disabled>
            Unmark
          </Button>
          <Button mode="outlined" style={styles.cardButton} disabled>
            Delete
          </Button>
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
  }
});

import { connect } from "react-redux";
import OAuthAuthorize from "../components/OAuthAuthorize";
import { getAccessToken } from "../actions/auth";

const mapStateToProps = state => ({
  client_id: state.auth.client_id,
  instanceURL: state.auth.instanceURL
});

const mapDispatchToProps = dispatch => ({
  handleAuthCode: code => dispatch(getAccessToken(code))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OAuthAuthorize);

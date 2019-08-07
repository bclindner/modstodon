import { connect } from "react-redux";
import AuthLoading from "../components/AuthLoading";

export const mapStateToProps = state => ({
  loggedIn: state.auth.instanceURL && state.auth.access_token ? true : false,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(AuthLoading);

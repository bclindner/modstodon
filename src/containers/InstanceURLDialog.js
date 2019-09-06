import { connect } from "react-redux";
import InstanceURLDialog from "../components/InstanceURLDialog";
import { registerApp, authorize, clearError } from "../actions/auth";

const mapStateToProps = state => {
return ({
  clientId: state.auth.client_id,
  hasToken: state.auth.access_token.length > 0,
  errored: state.auth.error.length > 0
})
}
const mapDispatchToProps = dispatch => ({
  registerApp: instanceURL => dispatch(registerApp(instanceURL)),
  authorize: () => dispatch(authorize()),
  clearError: () => dispatch(clearError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstanceURLDialog);

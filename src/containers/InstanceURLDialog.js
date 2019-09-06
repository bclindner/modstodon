import { connect } from "react-redux";
import InstanceURLDialog from "../components/InstanceURLDialog";
import { registerApp, authorize } from "../actions/auth";

const mapStateToProps = state => {
return ({
  hasAppCreds: state.auth.client_id.length > 0,
  hasToken: state.auth.access_token.length > 0
})
}
const mapDispatchToProps = dispatch => ({
  registerApp: instanceURL => dispatch(registerApp(instanceURL)),
  authorize: () => dispatch(authorize())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstanceURLDialog);

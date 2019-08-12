import Report from "../components/Report";
import { connect } from "react-redux";

import { getReport, performAction } from "../actions/reports";

const mapStateToProps = state => ({
  report: state.reports.reports[state.reports.selectedReport],
  loading: state.reports.loading
});

const mapDispatchToProps = dispatch => ({
  refresh: id => dispatch(getReport(id)),
  performAction: (accountID, type, reportID, text, sendEmailNotification) =>
    dispatch(
      performAction(accountID, type, reportID, text, sendEmailNotification)
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Report);

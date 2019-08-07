import Report from "../components/Report";
import { connect } from "react-redux";

import { getReport } from "../actions/reports";

const mapStateToProps = state => ({
  report: state.reports.reports[state.reports.selectedReport],
  loading: state.reports.loading
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  refresh: () => dispatch(getReport(ownProps.report.id)),
  performAction: (type, text, sendEmailNotification) =>
    dispatch(
      performAction(
        ownProps.report.target_account.id,
        type,
        ownProps.report.id,
        text,
        sendEmailNotification
      )
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Report);

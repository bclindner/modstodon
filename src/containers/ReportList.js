import ReportList from "../components/ReportList";
import { connect } from "react-redux";

import { selectReport, getReports, clearReports } from "../actions/reports";

const mapStateToProps = state => ({
  refreshing: state.reports.loading,
  reports: state.reports.reports,
  lastUpdated: state.reports.lastUpdated
});

const mapDispatchToProps = dispatch => ({
  selectReport: reportID => dispatch(selectReport(reportID)),
  getReports: max_id => dispatch(getReports(max_id)),
  clearReports: () => dispatch(clearReports())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportList);

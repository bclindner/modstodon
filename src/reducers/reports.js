import {
  REQUEST_REPORTS,
  REQUEST_REPORT,
  REPORT_FETCH_ERROR,
  RECEIVE_REPORTS,
  RECEIVE_REPORT,
  SELECT_REPORT,
  CLEAR_REPORTS
} from "../actions/reports";

const initialState = {
  reports: [],
  selectedReport: 0,
  loading: false,
  error: ""
};

export default function reports(state = initialState, action) {
  switch (action.type) {
    // Loading actions
    case REQUEST_REPORTS:
    case REQUEST_REPORT:
      return {
        ...state,
        loading: true
      };
    // Error
    case REPORT_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error.toString()
      };
    case RECEIVE_REPORTS:
      return {
        ...state,
        reports: action.reports
          .reduce((reports, report) => {
            const idx = reports.findIndex(
              reportInArray => reportInArray.id == report.id
            );
            if (idx !== -1) {
              reports[idx] = report;
            } else {
              reports.push(report);
            }
            return reports;
          }, state.reports)
          .sort(sortReportsById),
        loading: false
      };
    case RECEIVE_REPORT:
      let reports = state.reports;
      const idx = reports.findIndex(
        reportInArray => reportInArray.id == action.report.id
      );
      return {
        ...state,
        reports,
        loading: false
      };
    case SELECT_REPORT:
      return { ...state, selectedReport: action.reportID };
    case CLEAR_REPORTS:
      return { ...state, reports: [] };
    default:
      return state;
  }
}

const sortReportsById = (a, b) => {
            if (a.id < b.id) {
              return 1;
            } else if (a.id > b.id) {
              return -1;
            } else {
              console.warn(
                `Duplicate report with ID ${
                  a.id
                } detected. This shouldn't be possible...`
              );
              return 0;
            }
}
import {
    REQUEST_REPORTS_LIST,
    REQUEST_REPORT,
    REPORT_FETCH_ERROR,
    RECEIVE_REPORTS_LIST,
    RECEIVE_REPORT,
    SELECT_REPORT
} from '../actions/reports'

const initialState = {
    reports: {},
    selectedReport: 0,
    loading: false,
    error: ""
}

export default function reports(state = initialState, action) {
    switch (action.type) {
        // Loading actions
        case REQUEST_REPORTS_LIST:
        case REQUEST_REPORT:
            return {
                ...state,
                loading: true
            }
        // Error
        case REPORT_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error.toString()
            }
        case RECEIVE_REPORTS_LIST:
            return {
                ...state,
                reports: action.reports.reduce((reports, report) => ({ ...reports, [report.id]: report }), state.reports),
                loading: false
            }
        case RECEIVE_REPORT:
            return {
                ...state,
                reports: {
                    ...state.reports,
                    [action.report.id]: action.report
                },
                loading: false
            }
        case SELECT_REPORT:
            return { ...state, selectedReport: action.reportID }
        default: return state
    }
}
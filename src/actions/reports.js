import {
    getReports as _getReports,
    getReport as _getReport
} from "../utils/API"

export const getReports = (since_id, limit = 10) => async (dispatch, getState) => {
    dispatch(requestReports())
    const { instanceURL, access_token } = getState().auth
    try {
        const reports = await _getReports(instanceURL, access_token, since_id, limit)
        dispatch(receiveReports(reports))
    } catch (err) {
        dispatch(reportFetchError(err))
    }
}

export const REQUEST_REPORTS = 'reports/REQUEST_REPORTS'
export const requestReports = () => ({
    type: REQUEST_REPORTS
})

export const RECEIVE_REPORTS = 'reports/RECEIVE_REPORTS'
export const receiveReports = reports => ({
    type: RECEIVE_REPORTS,
    reports
})

export const getReport = id => async (dispatch, getState) => {
    dispatch(requestReport())
    const { instanceURL, access_token } = getState().auth
    try {
        const report = await _getReport(instanceURL, access_token, id)
        dispatch(receiveReport(report))
    } catch (err) {
        dispatch(reportFetchError(err))
    }
}

export const REQUEST_REPORT = 'reports/REQUEST_REPORT'
export const requestReport = reportID => ({
    type: REQUEST_REPORT,
    reportID
})

export const RECEIVE_REPORT = 'reports/RECEIVE_REPORT'
export const receiveReport = report => ({
    type: RECEIVE_REPORT,
    report
})

export const REPORT_FETCH_ERROR = "reports/REPORT_FETCH_ERROR"
export const reportFetchError = error => ({
    type: REPORT_FETCH_ERROR,
    error
})

export const SELECT_REPORT = "reports/SELECT_REPORT"
export const selectReport = reportID => ({
    type: SELECT_REPORT,
    reportID
})
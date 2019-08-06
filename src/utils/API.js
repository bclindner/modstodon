import axios from "axios"
import url from "url"

export const OAUTH_CLIENT_NAME = "Modstodon"
export const OAUTH_REDIRECT_URI = "modstodon://redirect"
export const OAUTH_SCOPES = "admin:read admin:write"
export const OAUTH_WEBSITE = "https://github.com/bclindner/modstodon"

export const registerApp = async instanceURL => (await axios.post(url.resolve(instanceURL, '/api/v1/apps'), {
    client_name: OAUTH_CLIENT_NAME,
    redirect_uris: OAUTH_REDIRECT_URI,
    scopes: OAUTH_SCOPES,
    webiste: OAUTH_WEBSITE
})).data

const authHeaders = token => ({
    "Authorization": "Bearer " + token
})

export const getReports = async (instanceURL, token, resolved = true, since_id, limit = 10) => (
    await axios.get(url.resolve(instanceURL, '/api/v1/admin/reports'), {
        params: {
            resolved,
            since_id,
            limit
        },
        headers: authHeaders(token)
    })
).data

export const getReport = async (instanceURL, token, reportID) => (
    await axios.get(url.resolve(instanceURL, `/api/v1/admin/reports/${reportID}`), {
        headers: authHeaders(token)
    })
).data
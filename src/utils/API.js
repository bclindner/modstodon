import axios from "axios";
import url from "url";

export const OAUTH_CLIENT_NAME = "Modstodon";
export const OAUTH_REDIRECT_URI = "com.bclindner.modstodon://oauth";
// Mastodon needs these as a string...
export const OAUTH_SCOPES = "admin:read admin:write";
// ...and AppAuth needs this as an array.
export const OAUTH_SCOPES_ARRAY = ['admin:read', 'admin:write'];
export const OAUTH_WEBSITE = "https://github.com/bclindner/modstodon";

export const registerApp = async instanceURL =>
  (await axios.post(url.resolve(instanceURL, "/api/v1/apps"), {
    client_name: OAUTH_CLIENT_NAME,
    redirect_uris: OAUTH_REDIRECT_URI,
    scopes: OAUTH_SCOPES,
    webiste: OAUTH_WEBSITE
  })).data;

const authHeaders = token => ({
  Authorization: "Bearer " + token
});

export const getReports = async (
  instanceURL,
  token,
  max_id,
  limit = 10,
  resolved
) =>
  (await axios.get(url.resolve(instanceURL, "/api/v1/admin/reports"), {
    params: {
      resolved,
      max_id,
      limit
    },
    headers: authHeaders(token)
  })).data;

export const getReport = async (instanceURL, token, reportID) =>
  (await axios.get(
    url.resolve(instanceURL, `/api/v1/admin/reports/${reportID}`),
    {
      headers: authHeaders(token)
    }
  )).data;

export const performAction = async (
  instanceURL,
  token,
  account_id,
  type,
  report_id,
  text,
  send_email_notification
) =>
  (await axios.post(
    url.resolve(instanceURL, `/api/v1/admin/accounts/${account_id}/action`),
    {
      type,
      report_id,
      text,
      send_email_notification
    },
    {
      headers: authHeaders(token)
    }
  )).data;

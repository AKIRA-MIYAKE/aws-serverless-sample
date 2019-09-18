export default {
  client_id: process.env.REACT_APP_OIDC_CLIENT_ID,
  redirect_uri: 'http://localhost:3000/authentication/callback',
  response_type: 'code',
  scope: 'openid',
  authority: process.env.REACT_APP_OIDC_AUTHORITY,
  silent_redirect_uri: 'http://localhost:3000/authentication/silent_callback',
  automaticSilentRenew: true,
  loadUserInfo: true,
  triggerAuthFlow: true,
  post_logout_redirect_uri: 'http://localhost:3000',
};

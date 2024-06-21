export const configuration = {
  client_id: 'react-client',
  redirect_uri: window.location.origin + '/authentication/callback',
  silent_redirect_uri: window.location.origin + '/authentication/silent-callback',
  scope: 'openid profile eshoppinggateway',
  authority: 'https://localhost:9009',
  service_worker_relative_url: '/OidcServiceWorker.js',
  service_worker_only: true,
  response_type: "code id_token",
};
export const environment = {
  production: true,
   OAuthConfig:  {
    issuer: 'https://accounts.google.com',
    clientId: '59285522216-7f0oudam27cuuosgjjed2tekg84krjpn.apps.googleusercontent.com',
    strictDiscoveryDocumentValidation: false,
    redirectUri: window.location.origin,
    scope: 'openid profile email https://www.googleapis.com/auth/contacts',
  }
};

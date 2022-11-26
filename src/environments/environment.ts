// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   OAuthConfig:  {
    issuer: 'https://accounts.google.com',
    clientId: '59285522216-7f0oudam27cuuosgjjed2tekg84krjpn.apps.googleusercontent.com',
    strictDiscoveryDocumentValidation: false,
    redirectUri: window.location.origin,
    scope: 'openid profile email https://www.googleapis.com/auth/contacts',
  }
  
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

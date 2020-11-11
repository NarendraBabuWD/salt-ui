import { environment } from './environments/environment';

// Environment specific settings
let serviceApiBaseUrl = '';
let mediaBaseUrl = '';

if (environment.production) {
//    serviceApiBaseUrl = 'http://localhost:19323/';
     serviceApiBaseUrl = 'http://13.75.138.135/salt/';
     mediaBaseUrl = 'http://media.edunix.in/';

} else {
    
  //  serviceApiBaseUrl = 'http://localhost:19323/';
  // serviceApiBaseUrl = 'http://23.101.222.132/salt/';
  serviceApiBaseUrl = 'http://13.75.138.135/salt/';

    // serviceApiBaseUrl = 'http://synap-api.azurewebsites.net/';
    mediaBaseUrl = 'http://media.edunix.in/';
}

export const Config = {
    passwordMinLength: 8,
    passwordMaxLength: 50,
    redirectDelay: 100,
    baseUrl: serviceApiBaseUrl,
    apiBaseUrl: serviceApiBaseUrl,
    mediaUploadUrl: mediaBaseUrl + 'api/upload/',
    mediaViewUrl: mediaBaseUrl + 'api/view/',
   // authenticationTokenUrl: serviceApiBaseUrl + 'Login?_format=json',
    // authenticationTokenUrl: serviceApiBaseUrl + 'Login',
    authenticationTokenUrl: serviceApiBaseUrl + 'Login/authenticate',
  };


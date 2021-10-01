import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'zone.js';
import Amplify, {Auth} from 'aws-amplify';
import awsconfig from './aws-exports';

// Amplify.configure(awsconfig);
Amplify.configure({
  // OPTIONAL - if your API requires authentication
  Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-east-1:8ddf44cf-7bf3-424e-ab06-6bde8dd366f3',
    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_kTEhTWvsf',
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '6njk8md4n5o9d6e9jfisfqkm6c',
  },
  API: {
    endpoints: [
      {
        name: "petstore",
        endpoint: "https://bi6mfa71pb.execute-api.us-east-1.amazonaws.com"
      },
    ]
  }
});
Auth.configure(awsconfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

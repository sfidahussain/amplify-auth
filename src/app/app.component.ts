import {ChangeDetectorRef, Component} from '@angular/core';
import {onAuthUIStateChange, CognitoUserInterface, AuthState} from '@aws-amplify/ui-components'
import API from '@aws-amplify/api';
import { FormBuilder } from '@angular/forms';
import {Auth} from "aws-amplify";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amplify-auth';
  user: CognitoUserInterface | undefined;
  authState!: AuthState;
  petForm = this.formBuilder.group({
    name: ''
  });
  pets: any;

  apiName = 'petstore';
  path = '/petstore/pets/1';

  constructor(private ref: ChangeDetectorRef, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    })
    API.get(this.apiName, this.path, {}).then(response => {
      // Add your code here
      this.pets = response;
      console.log(response);
    });
  }

  async onSubmit(): Promise<void> {
    const myInit = {
      body: {
        "name": this.petForm.get('name')?.value
      }, // replace this with attributes you need
      headers: {
        Authorization: `Bearer ${(await (Auth.currentSession())).getIdToken().getJwtToken()}`,
      }, // OPTIONAL
    };

    API.put(this.apiName, this.path, myInit).then(response => {
      console.log('successful POST');
    }).catch(error => {
      console.log(error.response);
    });
    API.get(this.apiName, this.path, {}).then(response => {
      // Add your code here
      this.pets = response;
      console.log(response);
    });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}

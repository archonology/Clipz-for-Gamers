import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { environment } from './environments/environment.development';
// We initialize firebase before we initialize the application to avoid lag in authentication-based rendering (like in the navigation bar)
// To keep the application from reloading every time a user logs or out, we set the appInit conditional to make sure the reload only occurs once.
firebase.initializeApp(environment.firebase)
let appInit = false
firebase.auth().onAuthStateChanged(() => {
  if (!appInit) {
    bootstrapApplication(AppComponent, appConfig)
      .catch((err) => console.error(err));
  }
  appInit = true
})


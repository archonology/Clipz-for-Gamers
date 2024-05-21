import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from './auth-modal/auth-modal.component';

import { SharedModule } from '../shared/shared.module';
import { RegistrationComponent } from './registration/registration.component';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import { environment } from '../../environments/environment.development';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    AuthModalComponent,
    RegistrationComponent,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  exports:[
    AuthModalComponent,
    RegistrationComponent
  ]
})
export class UserModule { }

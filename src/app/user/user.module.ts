import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegistrationComponent } from './registration/registration.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    AuthModalComponent,
    RegistrationComponent,
    ReactiveFormsModule
  ],
  exports:[
    AuthModalComponent,
    RegistrationComponent
  ]
})
export class UserModule { }

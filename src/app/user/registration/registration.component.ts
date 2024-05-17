import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { InputComponent } from '../../shared/input/input.component';
import { AlertComponent } from '../../shared/alert/alert.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    NgIf,
    InputComponent,
    AlertComponent
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  constructor(private auth: AngularFireAuth) { }

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  // Users must be 18 or older and set max for error handling
  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ])
  confirm_password = new FormControl('', [
    Validators.required,

  ])
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ])

  showAlert = false
  alertMsg = 'Please wait! Your account is being created.'
  alertColor = 'blue'

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber
  })
  async register() {
    this.showAlert = true
    this.alertMsg = 'Please wait! Your account is being created.'
    this.alertColor = 'blue'

    const { email, password } = this.registerForm.value

    const userCred = await this.auth.createUserWithEmailAndPassword(email as string, password as string)
  }
}

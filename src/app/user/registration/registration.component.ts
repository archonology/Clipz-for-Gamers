import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { InputComponent } from '../../shared/input/input.component';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf, InputComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
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

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber
  })
  register() {
    console.log("Submitted!")
  }
}

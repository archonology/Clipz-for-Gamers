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
  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl(''),
    age: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl(''),
    phoneNumber: new FormControl('')
  })
}

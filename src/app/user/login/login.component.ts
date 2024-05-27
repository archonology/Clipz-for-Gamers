import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AlertComponent } from '../../shared/alert/alert.component';
import { Auth } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private auth: Auth = inject(Auth)

  constructor() {

  }

  credentials = {
    email: '',
    password: ''
  }

  showAlert = false
  alertMsg = 'Please wait! You are being logged in...'
  alertColor = 'blue'
  inSubmission = false

  async login() {
    this.showAlert = false
    this.alertMsg = 'Please wait! You are being logged in...'
    this.alertColor = 'blue'
    this.inSubmission = true

    try {
      this.showAlert = true
      this.alertMsg = 'Please wait! You are being logged in...'
      this.alertColor = 'blue'
      this.inSubmission = false
      await signInWithEmailAndPassword(
        this.auth,
        this.credentials.email as string,
        this.credentials.password as string
      )
    } catch (e) {
      this.inSubmission = false
      this.showAlert = true
      this.alertMsg = 'There was an error logging you in.'
      this.alertColor = 'red'
      return
    }
    this.showAlert = true
    this.alertMsg = 'Success! You are logged in.'
    this.alertColor = 'green'
  }

}

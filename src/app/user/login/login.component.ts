import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AlertComponent } from '../../shared/alert/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  }

  showAlert = false
  alertMsg = 'Please wait! You are being logged in...'
  alertColor = 'blue'

  login() {
    this.showAlert = true
    this.alertMsg = 'Please wait! You are being logged in...'
    this.alertColor = 'blue'
  }

}

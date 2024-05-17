import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserModule } from './user/user.module';
import { NavComponent } from './nav/nav.component';
import { AuthModalComponent } from './user/auth-modal/auth-modal.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    RouterOutlet,
    UserModule,
    NavComponent,
    AuthModalComponent,
    AngularFireAuthModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'clipz';
}

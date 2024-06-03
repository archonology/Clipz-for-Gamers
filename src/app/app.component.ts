import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserModule } from './user/user.module';
import { NavComponent } from './nav/nav.component';
import { AuthModalComponent } from './user/auth-modal/auth-modal.component';
import { AuthService } from './services/auth.service';
// import { VideoModule } from './video/video.module';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';


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
    // VideoModule,
    AngularFireStorageModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(public auth: AuthService) {

  }
}

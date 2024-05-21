import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  isAuthenticated = false
  constructor(
    public modal: ModalService,
    public auth: AuthService
  ) {
    this.auth.authorized ? this.isAuthenticated = true : this.isAuthenticated = false
  }

  openModal($event: Event) {
    $event.preventDefault()

    this.modal.toggleModal('auth')
  }
}

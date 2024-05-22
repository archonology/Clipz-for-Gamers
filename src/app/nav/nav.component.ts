import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  private afAuth: Auth = (inject(Auth));
  constructor(
    public modal: ModalService,
    public auth: AuthService
  ) {
  }

  openModal($event: Event) {
    $event.preventDefault()

    this.modal.toggleModal('auth')
  }

  async logout($event: Event) {
    $event.preventDefault()
    await this.afAuth.signOut()
  }
}

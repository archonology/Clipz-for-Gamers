import { Component } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ModalService } from '../../services/modal.service';
@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.css',
})
export class AuthModalComponent {
  constructor(public modal: ModalService) {}

  ngOnInit(): void {
    this.modal.register('auth');
  }
}

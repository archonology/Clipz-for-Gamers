import { Component, Input } from '@angular/core';
import { AuthModalComponent } from '../../user/auth-modal/auth-modal.component';
import { ModalService } from '../../services/modal.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [AuthModalComponent, NgClass],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() modalID = ''
  constructor(public modal: ModalService) {}
  closeModal() {
    this.modal.toggleModal(this.modalID);
  }
}

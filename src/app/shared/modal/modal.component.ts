import { Component, Input, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnDestroy {
  @Input() modalID = '';

  constructor(public modal: ModalService, public el: ElementRef) {

  }
  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement)
  }

  ngOnDestroy() {
    // document.body.removeChild(this.el.nativeElement)
    this.modal.unregister(this.el.nativeElement)

  }

  closeModal() {
    this.modal.toggleModal(this.modalID);
  }

}

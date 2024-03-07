import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  // visible object is private to prevent other components from accessing it.
  private visible = false;

  constructor() {}

  isModalOpen() {
    return this.visible;
  }

  toggleModal() {
    this.visible = !this.visible
  }
}

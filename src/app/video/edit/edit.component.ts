import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ModalService } from '../../services/modal.service';
import IClip from '../../models/clip.model';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnDestroy, OnInit {
  @Input() activeClip: IClip | null = null
  constructor(private modal: ModalService) {

  }
  ngOnInit(): void {
    this.modal.register('editClip')
  }
  ngOnDestroy(): void {
    this.modal.unregister('editClip')
  }
}

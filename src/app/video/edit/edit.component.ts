import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ModalService } from '../../services/modal.service';
import IClip from '../../models/clip.model';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';



@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule, InputComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnDestroy, OnInit, OnChanges {
  @Input() activeClip: IClip | null = null
  constructor(private modal: ModalService) {

  }

  clipID = new FormControl('', { nonNullable: true })
  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  })

  editForm = new FormGroup({
    title: this.title,
    id: this.clipID
  })


  ngOnInit(): void {
    this.modal.register('editClip')
  }
  ngOnDestroy(): void {
    this.modal.unregister('editClip')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.activeClip) {
      return
    }
    this.clipID.setValue(this.activeClip.docID as string)
    this.title.setValue(this.activeClip.title)
  }
}

import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ModalService } from '../../services/modal.service';
import IClip from '../../models/clip.model';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { AlertComponent } from '../../shared/alert/alert.component';
import { NgClass, NgIf } from '@angular/common';
import { ClipService } from '../../services/clip.service';



@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule, InputComponent, AlertComponent, NgClass, NgIf],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnDestroy, OnInit, OnChanges {
  @Input() activeClip: IClip | null = null
  constructor(
    private modal: ModalService,
    private clipService: ClipService
  ) {

  }
  inSubmission = false
  showAlert = false
  alertColor = 'blue'
  alertMsg = 'Please wait! Updating clip.'
  @Output() update = new EventEmitter()

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

  async submit() {
    if (!this.activeClip) {
      return
    }
    this.inSubmission = true
    this.showAlert = true
    this.alertColor = 'blue'
    this.alertMsg = 'Please wait! Updating clip.'
    try {
      this.clipService.updateClip(this.clipID.value, this.title.value)
    } catch (e) {
      console.error(e)
      this.inSubmission = false
      this.alertColor = 'red'
      this.alertMsg = 'Something went wrong. Try again later.'
    }
    // send the updated data back to the manage component
    this.activeClip.title = this.title.value as string
    this.update.emit(this.activeClip)
    this.inSubmission = false
    this.alertColor = 'green'
    this.alertMsg = 'Success!'
  }
}

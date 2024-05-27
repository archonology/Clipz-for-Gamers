import { Component, inject } from '@angular/core';
import { EventBlockerDirective } from '../../shared/directives/event-blocker.directive';
import { NgClass, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [EventBlockerDirective, NgClass, NgIf, ReactiveFormsModule, InputComponent],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

  constructor(private storage: AngularFireStorage) { }
  //set a custom hover event to keep the visuals for the user
  isDragover = false
  nextStep = false
  file: File | null = null
  storeFile($event: Event) {
    this.isDragover = false
    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null

    if (!this.file || this.file.type !== 'video/mp4') {
      return
    }
    this.title.setValue(
      //Default title to file name and remove file extension with Regex.
      this.file.name.replace(/\.[^/.]+$/, ''),
    )
    this.nextStep = true
  }

  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  })

  uploadForm = new FormGroup({
    title: this.title
  })

  uploadFile() {
    const clipFileName = uuid()
    const clipPath = `clips/${clipFileName}.mp4`
    this.storage.upload(clipPath, this.file)
  }
}

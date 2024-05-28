import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventBlockerDirective } from '../../shared/directives/event-blocker.directive';
import { NgClass, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { v4 as uuid } from 'uuid';
import { AlertComponent } from '../../shared/alert/alert.component';
import { last, switchMap } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { ClipService } from '../../services/clip.service';
import firebase from 'firebase/compat/app'

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [EventBlockerDirective, NgClass, NgIf, ReactiveFormsModule, InputComponent, AlertComponent, CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  private auth: Auth = (inject(Auth));
  constructor(
    private storage: AngularFireStorage,
    private clipService: ClipService) {
  }
  //set a custom hover event to keep the visuals for the user
  isDragover = false
  nextStep = false
  showAlert = false
  alertColor = 'blue'
  alertMsg = 'Please wait! Your clip is being uploaded.'
  inSubmission = false
  percentage = 0
  showPercentage = false
  file: File | null = null

  storeFile($event: Event) {
    this.isDragover = false
    // check if files are dragged in or input was used (dragging not supported on mobile).
    this.file = ($event as DragEvent).dataTransfer ?
      ($event as DragEvent).dataTransfer?.files.item(0) ?? null :
      ($event.target as HTMLInputElement).files?.item(0) ?? null

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
    // disable the upload form to prevent changes after submitting
    this.uploadForm.disable()
    this.showAlert = true
    this.alertColor = 'blue'
    this.alertMsg = 'Please wait! Your clip is being uploaded.'
    this.inSubmission = true
    this.showPercentage = true
    const clipFileName = uuid()
    const clipPath = `clips/${clipFileName}.mp4`
    const task = this.storage.upload(clipPath, this.file)
    const clipRef = this.storage.ref(clipPath)
    task.percentageChanges().subscribe(progress => {
      this.percentage = progress as number / 100
    })

    task.snapshotChanges().pipe(
      last(),
      switchMap(() => clipRef.getDownloadURL())
    ).subscribe({
      next: (url) => {
        const clip = {
          uid: this.auth.currentUser?.uid as string,
          displayName: this.auth.currentUser?.displayName as string,
          title: this.title.value,
          fileName: `${clipFileName}.mp4`,
          url
        }
        this.clipService.createClip(clip)

        console.log(clip)

        this.alertColor = 'green'
        this.alertMsg = 'Success! Your clip is ready to share with the world!'
        this.showPercentage = false
      },
      error: (error) => {
        this.uploadForm.enable()
        this.alertColor = 'red'
        this.alertMsg = 'Upload failed! Please try again later.'
        this.inSubmission = true
        this.showPercentage = false
        console.error(error)
      }
    })
  }
}
// Snapshots and Refs
// a reference is an object that points to a location in the application
// it allows you to read/write refrences and create new references
// snapshots are objects that are a copy of a location in the app
// they are read only and immutable -- they are memory efficient because of this. They are created for you during events, unlike Refs, which you create.
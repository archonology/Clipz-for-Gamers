import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventBlockerDirective } from '../../shared/directives/event-blocker.directive';
import { NgClass, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { v4 as uuid } from 'uuid';
import { AlertComponent } from '../../shared/alert/alert.component';
import { last, switchMap } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { ClipService } from '../../services/clip.service';
import { Firestore, doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { serverTimestamp } from '@angular/fire/firestore';


@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [EventBlockerDirective, NgClass, NgIf, ReactiveFormsModule, InputComponent, AlertComponent, CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnDestroy {
  private auth: Auth = (inject(Auth));
  private db: Firestore = inject(Firestore);
  constructor(
    private storage: AngularFireStorage,
    private clipService: ClipService,
    private router: Router
  ) {
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
  task?: AngularFireUploadTask

  // when a user navigates away from the upload page, the upload process will continue by default, but it won't have access to the file data anymore. To prevent flawed uploads, the AngularFIreUploadTask will be cancelled if the user leaves the page.
  ngOnDestroy(): void {
    this.task?.cancel()

  }

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
    this.task = this.storage.upload(clipPath, this.file)
    const clipRef = this.storage.ref(clipPath)
    this.task.percentageChanges().subscribe(progress => {
      this.percentage = progress as number / 100
    })

    this.task.snapshotChanges().pipe(
      last(),
      switchMap(() => clipRef.getDownloadURL())
    ).subscribe({
      next: async (url) => {
        const clip = {
          uid: this.auth.currentUser?.uid as string,
          displayName: this.auth.currentUser?.displayName as string,
          title: this.title.value,
          fileName: `${clipFileName}.mp4`,
          url,
          timestamp: serverTimestamp()
        }
        const clipDocRef = await this.clipService.createClip(clip)
        // because of recent AngularFire compatability issues, I am doing the query of the just created clip here (with getClip), rather than the createClip function, though it isn't ideal. I ran into issues with setDoc method not returning the kind of promise I needed, and the new AngularFire tree shaking method doesn't have any supporting docs at the time of creation. Additionally, the modular way was goving me a lot of trouble when dealing with services and Angular's new 'standalone' build defaults.
        const getClip = doc(this.db, 'clips', clipDocRef.fileName)

        this.alertColor = 'green'
        this.alertMsg = 'Success! Your clip is ready to share with the world!'
        this.showPercentage = false
        setTimeout(() => {
          this.router.navigate([
            'clip', getClip.id
          ])
        }, 1000)
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
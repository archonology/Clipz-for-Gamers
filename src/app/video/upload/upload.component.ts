import { Component } from '@angular/core';
import { EventBlockerDirective } from '../../shared/directives/event-blocker.directive';
import { NgClass, NgIf } from '@angular/common';


@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [EventBlockerDirective, NgClass, NgIf],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
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
    this.nextStep = true
  }
}

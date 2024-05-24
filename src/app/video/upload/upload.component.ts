import { Component } from '@angular/core';
import { EventBlockerDirective } from '../../shared/directives/event-blocker.directive';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [EventBlockerDirective, NgClass],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  //set a custom hover event to keep the visuals for the user
  isDragover = false

  storeFile($event: Event) {
    this.isDragover = false
  }
}

import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ClipService } from '../services/clip.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FbTimestampPipe } from '../pipes/fb-timestamp.pipe';

@Component({
  selector: 'app-clips-list',
  standalone: true,
  imports: [NgFor, RouterLink, FbTimestampPipe],
  templateUrl: './clips-list.component.html',
  styleUrl: './clips-list.component.css',
  providers: [DatePipe]
})
export class ClipsListComponent implements OnInit {
  @Input() scrollable = true
  constructor(public clipService: ClipService) {
    this.clipService.getClips()
  }
  ngOnInit(): void {
    if (this.scrollable) {
      window.addEventListener('scroll', this.handleScroll)
    }

  }

  handleScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement
    const { innerHeight } = window

    const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight

    if (bottomOfWindow) {
      this.clipService.getClips()
    }
  }

  onActivate($event: Event) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}

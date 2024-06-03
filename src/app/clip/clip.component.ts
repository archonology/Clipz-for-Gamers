import { Component, ViewEncapsulation, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import videojs from 'video.js'
import IClip from '../models/clip.model';
import { DatePipe } from '@angular/common';
import { FbTimestampPipe } from '../pipes/fb-timestamp.pipe';
import { ClipsListComponent } from '../clips-list/clips-list.component';


@Component({
  selector: 'app-clip',
  standalone: true,
  imports: [FbTimestampPipe, ClipsListComponent],
  templateUrl: './clip.component.html',
  styleUrl: './clip.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class ClipComponent implements OnInit {
  // id = ''
  @ViewChild('videoPlayer', { static: true }) target?: ElementRef;
  player?: videojs.Player
  clip?: IClip
  constructor(private activatedRoute: ActivatedRoute) {
    // this.activatedRoute.params.subscribe((params: Params) => {
    //   this.id = params['id']
    // });
  }

  ngOnInit(): void {
    this.player = videojs(this.target?.nativeElement)
    this.activatedRoute.data.subscribe(data => {
      this.clip = data['clip'] as IClip

      this.player?.src({
        src: this.clip.url,
        type: 'video/mp4'
      })
    })
  }
}

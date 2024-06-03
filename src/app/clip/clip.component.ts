import { Component, ViewEncapsulation, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import videojs from 'video.js'


@Component({
  selector: 'app-clip',
  standalone: true,
  imports: [],
  templateUrl: './clip.component.html',
  styleUrl: './clip.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ClipComponent implements OnInit {
  id = ''
  @ViewChild('videoPlayer', { static: true }) target?: ElementRef;
  player?: videojs.Player
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id']
    });
  }

  ngOnInit(): void {
    this.player = videojs(this.target?.nativeElement)
  }
}

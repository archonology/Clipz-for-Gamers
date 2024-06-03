import { Component, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ClipsListComponent } from '../clips-list/clips-list.component';
import videojs from 'video.js';



@Component({
  selector: 'app-clip',
  standalone: true,
  imports: [ClipsListComponent],
  templateUrl: './clip.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './clip.component.css',

})
export class ClipComponent implements OnInit {
  id = ''
  @ViewChild('videoPlayer', { static: true }) target?: ElementRef
  player?: videojs.Player

  constructor(private activatedRoute: ActivatedRoute) {
    this.player = videojs(this.target?.nativeElement)
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id']
    });

  }

  ngOnInit(): void {

  }
}

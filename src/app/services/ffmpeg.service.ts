import { Injectable } from '@angular/core';
import { createFFmpeg } from '@ffmpeg/ffmpeg'

@Injectable({
  providedIn: 'root'
})
export class FfmpegService {
  isReady = false
  private ffmpeg
  constructor() {
    // Ffmpeg has a bundled log tool so we can watch for errors in the console.
    this.ffmpeg = createFFmpeg({ log: true })
  }


  async init() {
    // Ffmpeg is massive, so don't load until it's ready -- that will keep our app a bit faster.
    if (this.isReady) {
      return
    }

    await this.ffmpeg.load()
    // Prevent reload
    this.isReady = true
  }
}

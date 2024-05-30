import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

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

  async getScreenshots(file: File) {
    // convert accepted file from fileObject to binary
    const data = await fetchFile(file)
    this.ffmpeg.FS('writeFile', file.name, data)

    await this.ffmpeg.run(
      // Input
      '-i', file.name,
      // Output options - picking clip locations ('hh:mm:ss') / scale -1 sets to auto.
      '-ss', '00:00:01',
      '-frames:v', '1',
      '-filter:v', 'scale=510:-1',
      // Output
      'output_01.png'
    )
  }
}

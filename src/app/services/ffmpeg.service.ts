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

    const seconds = [1, 2, 3]
    const commands: string[] = []
    // catch multiple screenshots
    seconds.forEach(second => {
      commands.push(
        // Input
        '-i', file.name,
        // Output options - picking clip locations ('hh:mm:ss') / scale -1 sets to auto.
        '-ss', `00:00:0${second}`,
        '-frames:v', '1',
        '-filter:v', 'scale=510:-1',
        // Output
        `output_0${second}.png`
      )
    })

    await this.ffmpeg.run(
      ...commands
    )
  }
}

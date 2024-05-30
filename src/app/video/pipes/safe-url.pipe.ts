import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Pipe({
  name: 'safeURL',
  standalone: true
})
// this is a dangerous pipe to use, and it is rare to need. we need it becuase Angular doesn't trust the screenshot URLs from videos that we are creating on upload. There isn't a better work around at this time, so we use this safeURLPipe.
export class SafeURLPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(value: string) {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }

}

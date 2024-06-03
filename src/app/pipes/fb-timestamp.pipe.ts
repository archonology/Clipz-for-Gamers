import { Pipe, PipeTransform } from '@angular/core';
import { FieldValue, Timestamp } from "@angular/fire/firestore";
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'fbTimestamp',
  standalone: true
})
export class FbTimestampPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) { }
  transform(value: FieldValue | undefined) {
    if (!value) {
      return ''
    }
    const date = (value as Timestamp).toDate()
    return this.datePipe.transform(date, 'mediumDate');
  }

}

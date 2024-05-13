import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
// ngx-mask will be used for masking the phone number field.
import { NgxMaskDirective } from 'ngx-mask';


@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgxMaskDirective],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() control: FormControl = new FormControl()
  @Input() type = 'text'
  @Input() placeholder = ''
  @Input() format = ''
}

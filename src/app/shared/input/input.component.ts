import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() control: FormControl = new FormControl()
}

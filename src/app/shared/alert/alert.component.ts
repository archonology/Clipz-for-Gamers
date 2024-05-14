import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() color = 'blue'

  // Dynamically set background color for alert box
  get bgColor() {
    return `bg-${this.color}-400`
  }
}

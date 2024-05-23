import { Component } from '@angular/core';
// Use ActivatedRoute to subscribe to data added to routes
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent {
  constructor() {
  }
  // see the data added to the route from here:
  // ngOnInit(): void {
  //   this.route.data.subscribe(console.log)
  // }
}

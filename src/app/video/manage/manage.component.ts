import { Component } from '@angular/core';
import { Router, RouterLink, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent {
  videoOrder = '1'

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'] === '2' ? params['sort'] : 1;
    })
  }

  // Elements can be set as types in TS
  sort(event: Event) {
    const { value } = (event.target as HTMLSelectElement)

    this.router.navigateByUrl(`/manage?sort=${value}`)

    // more nuanced but more powerful way to guide navigation -- has same behavior as above with these settings.
    //   this.router.navigate([], {
    //     relativeTo: this.route,
    //     queryParams: {
    //       sort: value
    //     }
    //   })
  }

}

// Path Parameters: to be used for returning a single resource or multiple resources.
// Query Parameters: to be used for sorting/filtering through data
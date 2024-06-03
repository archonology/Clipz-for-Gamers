import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router, RouterLink, ActivatedRoute, Params } from '@angular/router';
import { ClipService } from '../../services/clip.service';
import IClip from '../../models/clip.model';
import { EditComponent } from '../edit/edit.component';
import { ModalService } from '../../services/modal.service';
// BehaviorSubject can't be created with an operator
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { error } from 'console';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [RouterLink, NgFor, EditComponent],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent implements OnInit {
  videoOrder: string = '1'
  clips: IClip[] = []
  activeClip: IClip | null = null
  sort$: BehaviorSubject<string>
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clipService: ClipService,
    private modal: ModalService
  ) {

    this.sort$ = new BehaviorSubject(this.videoOrder)

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'] === '2' ? params['sort'] : '1'
      this.sort$.next(this.videoOrder)
      this.clipService.getUserClips(this.sort$).subscribe(docs => {
        this.clips = []
        docs.forEach(doc => {
          this.clips.push({
            docID: doc.id,
            ...doc.data()
          })
        })
      })
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

  openModal($event: Event, clip: IClip) {
    $event.preventDefault()
    this.activeClip = clip
    this.modal.toggleModal('editClip')
  }

  update($event: IClip) {
    this.clips.forEach((element, index) => {
      if (element.docID == $event.docID) {
        this.clips[index].title = $event.title
      }
    })
  }

  deleteClip($event: Event, clip: IClip) {
    $event.preventDefault()
    this.clipService.deleteClip(clip)

    this.clips.forEach((el, i) => {
      if (el.docID == clip.docID) {
        // update the DOM in a simple way
        this.clips.splice(i, 1)
      }
    })
  }

  async copyToClipboard($event: Event, docID: string | undefined) {
    $event.preventDefault()
    if (!docID) {
      return
    }

    const url = `${location.origin}/clip/$${docID}`
    await navigator.clipboard.writeText(url)

    alert('Link Copied!')
  }

}

// Path Parameters: to be used for returning a single resource or multiple resources.
// Query Parameters: to be used for sorting/filtering through data
import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, where, getDocs, query, QuerySnapshot, doc, updateDoc, deleteDoc, orderBy, limit, startAfter, getDoc } from '@angular/fire/firestore';
import { DocumentReference } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { switchMap, of, map, BehaviorSubject, combineLatest, pipe } from 'rxjs';
import { Storage, ref, deleteObject } from '@angular/fire/storage';
import IClip from '../models/clip.model';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClipService implements Resolve<IClip | null> {
  private db: Firestore = inject(Firestore);
  private auth: Auth = (inject(Auth));
  private storage = inject(Storage);
  pageClips: IClip[] = []
  pendingReq = false

  constructor(private router: Router) {

  }


  createClip(data: IClip): Promise<DocumentReference> {
    const clipsCollection = collection(this.db, 'clips')
    return addDoc(clipsCollection, data)
  }

  getUserClips(sort$: BehaviorSubject<string>) {
    //combine latest will get the latest, so will run when variables change -- we want to catch the sort$ variable so we can change the display order when the user requests it.
    return combineLatest([
      user(this.auth),
      sort$
    ]).pipe(
      switchMap(values => {
        const [user, sort] = values
        if (!user) {
          return of([])
        }
        const clipsCollection = collection(this.db, 'clips')
        const runQuery = query(clipsCollection, where('uid', '==', user.uid), orderBy(
          'timestamp',
          sort === '1' ? 'desc' : 'asc'
        ))

        return getDocs(runQuery)
      }),
      map(snapshot => (snapshot as QuerySnapshot<IClip>).docs)
    )
  }

  updateClip(id: string, title: string) {
    const clipsCollection = collection(this.db, 'clips')
    updateDoc(doc(clipsCollection, id), {
      title
    })
  }

  async deleteClip(clip: IClip) {
    const clipsCollection = collection(this.db, 'clips')
    const screenshotRef = ref(this.storage, `screenshots/${clip.screenshotFileName}`)
    const clipRef = ref(this.storage, `clips/${clip.fileName}`)
    await deleteDoc(doc(clipsCollection, clip.docID))
    await deleteObject(screenshotRef);
    await deleteObject(clipRef);

  }

  // infinite scrolling!
  async getClips() {
    if (this.pendingReq) {
      return
    }
    this.pendingReq = true
    const clipsCollection = collection(this.db, 'clips')
    let runQuery = query(clipsCollection, orderBy(
      'timestamp', 'desc'
    ), limit(6))

    const { length } = this.pageClips

    if (length) {
      const lastDocID = this.pageClips[length - 1].docID
      const lastDoc = doc(clipsCollection, lastDocID)
      runQuery = query(clipsCollection, orderBy(
        'timestamp', 'desc'
      ), limit(6), startAfter(lastDoc))
    }

    const snapshot = await getDocs(runQuery)
    snapshot.forEach(doc => {
      this.pageClips.push({
        docID: doc.id,
        ...doc.data() as any
      })
    })

    this.pendingReq = false
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const clipsCollection = collection(this.db, 'clips')
    if (this.pendingReq) {
      return
    }
    this.pendingReq = true

    // const snapshot = await getDoc(doc(clipsCollection, route.params['id']))

    return getDoc(doc(clipsCollection, route.params['id'])).then((snapshot) => {
      const data = snapshot.data()
      if (!data) {
        this.pendingReq = false
        this.router.navigate(['/'])
        return null
      }
      this.pendingReq = false
      return data
    })

  }
}
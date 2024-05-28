import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, where, getDocs, query, QuerySnapshot, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { DocumentReference } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { switchMap, of, map } from 'rxjs';

import IClip from '../models/clip.model';
@Injectable({
  providedIn: 'root'
})
export class ClipService {
  private db: Firestore = inject(Firestore);
  private auth: Auth = (inject(Auth));

  constructor() {
  }


  createClip(data: IClip): Promise<DocumentReference> {
    const clipsCollection = collection(this.db, 'clips')
    return addDoc(clipsCollection, data)
  }

  getUserClips() {
    return user(this.auth).pipe(
      switchMap(user => {
        if (!user) {
          return of([])
        }
        const clipsCollection = collection(this.db, 'clips')
        const runQuery = query(clipsCollection, where('uid', '==', user.uid))

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
    await deleteDoc(doc(clipsCollection, clip.docID))
  }
}

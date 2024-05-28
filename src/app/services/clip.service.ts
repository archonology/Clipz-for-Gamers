import { Injectable, inject } from '@angular/core';
import { Firestore, collection, setDoc, doc, getDoc } from '@angular/fire/firestore';

import IClip from '../models/clip.model';
@Injectable({
  providedIn: 'root'
})
export class ClipService {
  private db: Firestore = inject(Firestore);

  constructor() {
  }

  async createClip(data: IClip) {
    const clipsCollection = collection(this.db, 'clips')
    await setDoc(doc(clipsCollection), data)
    return data
  }
}

import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { DocumentReference } from '@angular/fire/firestore';

import IClip from '../models/clip.model';
@Injectable({
  providedIn: 'root'
})
export class ClipService {
  private db: Firestore = inject(Firestore);

  constructor() {
  }

  createClip(data: IClip): Promise<DocumentReference> {
    const clipsCollection = collection(this.db, 'clips')
    return addDoc(clipsCollection, data)
  }
}

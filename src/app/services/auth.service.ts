import { Injectable, inject } from '@angular/core';
import { Auth, updateProfile } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from "@angular/fire/auth";
import { Firestore, doc, setDoc, collection, updateDoc } from '@angular/fire/firestore';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private db: Firestore = inject(Firestore);
  private auth = (inject(Auth));
  constructor() { }

  public async createUser(userData: IUser) {
    const userCred = await createUserWithEmailAndPassword(this.auth, userData.email as string, userData.password as string)



    if (!userCred.user) {
      throw new Error("User can't be found!")
    }

    const submissionData: IUser = {
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber
    }

    const userCollection = collection(this.db, 'users')


    await setDoc(doc(userCollection, userCred.user.uid), submissionData)

    this.auth.currentUser
    await updateProfile(userCred.user, {
      displayName: userData.name
    })

  }
}

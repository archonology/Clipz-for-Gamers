import { Injectable, inject } from '@angular/core';
import { Auth, updateProfile, User, user } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from "@angular/fire/auth";
import { Firestore, doc, setDoc, collection } from '@angular/fire/firestore';
import IUser from '../models/user.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private db: Firestore = inject(Firestore);
  private auth: Auth = (inject(Auth));
  public authorized: boolean = false;
  user$ = user(this.auth);
  userSubscription: Subscription;


  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      console.log(aUser);
      if (aUser === null) {
        this.authorized = false;
        console.log('User is not logged in.')
      } else {
        this.authorized = true;
        console.log('User is logged in.')
      }
    })
  }

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
    await updateProfile(userCred.user, {
      displayName: userData.name
    })

  }
}

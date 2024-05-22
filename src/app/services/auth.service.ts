import { Injectable, inject } from '@angular/core';
import { Auth, updateProfile, user } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from "@angular/fire/auth";
import { Firestore, doc, setDoc, collection } from '@angular/fire/firestore';
import IUser from '../models/user.model';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private db: Firestore = inject(Firestore);
  private auth: Auth = (inject(Auth));
  public authorized: boolean = false;
  user$ = user(this.auth);
  public isAuthenticated$: Observable<boolean>
  public isAuthenticatedWithDelay$: Observable<boolean> 


  constructor() {
    this.isAuthenticated$ = this.user$.pipe(
      map(user => !!user)
    ),
      this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
        delay(1000)
      )
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

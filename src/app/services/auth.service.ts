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
  // userSubscription: Subscription;
  public isAuthenticated$: Observable<boolean>
  public isAuthenticatedWithDelay$: Observable<boolean> 


  constructor() {
    // This subscription approach works well, but the problem is we don't get access to the async properties of the pipe method -- pipe lets us use ngOnDestroy in the app-modal because onDestroy relies on a pipe or directive (and a few more, see docs) to identify the document AKA not break the application on destroy. Just be sure to import the commonmodule in whichever component template needs to access the pipe async features (used in the nav template in this app) -- they are not there by default.
    // this.userSubscription = this.user$.subscribe((aUser: User | null) => {
    //   console.log(aUser);
    //   if (aUser === null) {
    //     this.authorized = false;
    //     console.log('User is not logged in.')
    //   } else {
    //     this.authorized = true;
    //     console.log('User is logged in.')
    //   }
    // })
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

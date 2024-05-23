import { Injectable, inject } from '@angular/core';
import { Auth, updateProfile, user } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from "@angular/fire/auth";
import { Firestore, doc, setDoc, collection } from '@angular/fire/firestore';
import IUser from '../models/user.model';
import { Observable, of } from 'rxjs';
import { delay, map, filter, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute, NavigationEnd } from '@angular/router';

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
  public redirect = false;


  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isAuthenticated$ = this.user$.pipe(
      map(user => !!user)
    ),
      this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
        delay(1000)
      )

    // Redirection users for pages that require logged in status:
    // Angular doesn't let us target specific url events, so we can use pipe and filter from rxjs to see if the event matches the NavigationEnd (The event we need for redirecting based on auth). filter will return a boolean, so only true events will be passed on via filter.
    // Map through the filtered response and map through it to get down to the data value we need (authOnly).
    // nullish coalescing  operator -- ?? new addition to JS that handles null situations safely. Learn more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
    // we are also using the 'of' method in rxjs.

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => this.route.firstChild),
      switchMap(route => route?.data ?? of({ authOnly: false }))
    ).subscribe((data) => {
      this.redirect = data.authOnly ?? false;
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

  public async logout($event?: Event) {
    if ($event) {
      $event.preventDefault()
    }
    await this.auth.signOut()
    if (this.redirect) {
      // this navigateByUrl method needs an absolute path
    await this.router.navigateByUrl('/')
    }

  }
}

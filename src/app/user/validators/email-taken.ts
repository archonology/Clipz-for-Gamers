import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { fetchSignInMethodsForEmail } from '@angular/fire/auth';
// import { AngularFireAuth } from '@angular/fire/compat/auth'

// Regular JS classes do not come with injectable services from Angular unless designated with the Injectable Decorator. Once it is injectable, it can also be injectable to other services and components, but it must be explicitly stated for the latter via providedIn.
@Injectable({
    providedIn: 'root'
})
export class EmailTaken implements AsyncValidator {
    private auth: Auth = (inject(Auth));
    constructor() { }
    // needs to be an arrow function becuse JS will change the 'this' scope when we inject it into a component (see registration.component.ts)
    // BUG this validation is not being conducted; not hitting the network at all. Something with the AngularFire Auth import? Wrong import?
    validate = (control: AbstractControl): Promise<ValidationErrors | null> => {
        return fetchSignInMethodsForEmail(this.auth, control.value).then(
            response => response.length ? { emailTaken: true } : null
        )
    }
}

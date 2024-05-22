import { ValidationErrors, AbstractControl } from "@angular/forms";
export class RegisterValidators {
    // static methods allow you to directly call the method without creating a new class instance.
    // without static: new RegisterValidators.match()
    // with static: RegisterValidators.match()
    // STATIC METHODS DON'T have access to an object's properties or methods. AKA LIMITED SCOPE...

    static match(group: AbstractControl): ValidationErrors | null {
        const control = group.get('password')
        const matchingControl = group.get('confirm_password')

        if (!control || !matchingControl) {
            return { controlNotFound: false }
        }

        const error = control.value === matchingControl.value ? null : { noMatch: true }

        return error

    }
}

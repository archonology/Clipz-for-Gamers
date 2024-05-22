import { ValidationErrors, AbstractControl, ValidatorFn } from "@angular/forms";
export class RegisterValidators {
    // static methods allow you to directly call the method without creating a new class instance.
    // without static: new RegisterValidators.match()
    // with static: RegisterValidators.match()
    // STATIC METHODS DON'T have access to an object's properties or methods. AKA LIMITED SCOPE...

    static match(controlName: string, matchingControlName: string): ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const control = group.get(controlName)
            const matchingControl = group.get(matchingControlName)

            if (!control || !matchingControl) {
                return { controlNotFound: false }
            }

            const error = control.value === matchingControl.value ? null : { noMatch: true }

            return error
        }
    }
}

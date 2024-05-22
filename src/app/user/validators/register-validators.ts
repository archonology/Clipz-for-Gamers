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
                // error message for developers
                console.error("Form controls can not be found in the four group.")
                return { controlNotFound: false }
            }

            const error = control.value === matchingControl.value ? null : { noMatch: true }

            // set built in Angular errors with matchingControl -- this is handled in the shared/input/input.component.html file. ('noMatch')
            matchingControl.setErrors(error)

            return error
        }
    }
}

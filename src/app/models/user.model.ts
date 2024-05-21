export default interface IUser {
    email: string,
    password?: string,
    age: number,
    name: string,
    phoneNumber: string,
}
// in this case, interface or class would work. Classes are a feature of JS, interfaces are features of TS and don't get transpiled like classes. Methods can be added to classes, but not interfaces. Interfaces are good when the modal need is simple; as needs grow, you can always switch to a class modal, which also works with TS.

// Class modal syntax:

// export default class IUser {
//     email?: string;
//     password?: string;
//     age?: number;
//     name?: string;
//     phoneNumber?: string;
// }
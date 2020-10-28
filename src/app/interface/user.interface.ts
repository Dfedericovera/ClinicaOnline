export interface User {
    uid:string;
    email:string;
    displayName:string;
    emailVerified:boolean;
    code?:string;
    photoURL?: string;
 }
 
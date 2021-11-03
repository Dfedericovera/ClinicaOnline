import { UserType } from "./userType";

export class Usuario {
    public id: string;
    public name: string;
    public lastName: string;
    public email: string;
    public photos: Array<any>;
    public usertype:UserType;

    public constructor(init?: Partial<Usuario>) {
        if(init){
            Object.assign(this, init);
        }
        else{
            this.photos = new Array();
        }
    }

    

    public static CreatePatient(id: string, name: string, lastName: string,
        photos: Array<any>, email: string) :Usuario {
        let patient = new Usuario();
        
        patient.id = id;
        patient.name = name;
        patient.lastName = lastName;
        patient.photos = photos;
        patient.email = email;
        

        return patient;
    }


}
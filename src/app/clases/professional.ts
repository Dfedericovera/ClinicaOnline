import { Specialty } from './specialty';

export class Professional {
    public id: string;
    public name: string;
    public lastName: string;
    public age:number;
    public dni:string;
    public specialty: Array<Specialty>;
    public email: string;    
    public photos: Array<any>;

    public constructor(init?: Partial<Professional>) {
        if(init){
            Object.assign(this, init);
        }        
    }

    

    public static CreateProfessional(id: string, name: string, lastName: string,
        photo: Array<any>, email: string,specialty: Array<Specialty> ) :Professional {
        let profesional = new Professional();
        
        profesional.id = id;
        profesional.name = name;
        profesional.lastName = lastName;
        profesional.photos = photo;
        profesional.email = email;
        profesional.specialty = specialty;

        return profesional;
    }


}
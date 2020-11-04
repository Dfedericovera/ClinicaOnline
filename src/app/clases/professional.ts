import { Specialty } from './specialty';

export class Professional {
    public id: string;
    public name: string;
    public lastName: string;
    public photo: any;
    public email: string;
    public specialty: Array<Specialty>;

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
        profesional.photo = photo;
        profesional.email = email;
        profesional.specialty = specialty;

        return profesional;
    }


}
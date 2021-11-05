import { DisponibilidadHoraria } from '../interface/disponibilidad-horaria';
import { Specialty } from './specialty';
import { Usuario } from './usuario';

export class Professional extends Usuario{
    
    public age:number;
    public dni:string;
    public specialty: Array<Specialty>;    
    public approved:boolean;
    public disponibilidadHoraria:DisponibilidadHoraria;
    

    public constructor(init?: Partial<Professional>) {
        super()
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
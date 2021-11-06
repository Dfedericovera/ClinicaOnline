import { DisponibilidadHoraria } from "../interface/disponibilidad-horaria";

export class Specialty{

    id:string;
    specialty:string;
    duration:number;
    public disponibilidadHoraria:DisponibilidadHoraria;

    public constructor(init?: Partial<Specialty>) {
        if(init){
            Object.assign(this, init);
        }        
    }
}
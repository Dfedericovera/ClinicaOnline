import { Iencuesta } from '../interface/iencuesta';
import { Patient } from './patient';
import { Professional } from './professional';
import { Specialty } from './specialty';

export enum AppointmentState{
    Solicitado="Solicitado",
    Cancelado="Cancelado",
    Aceptado="Aceptado",
    Rechazado="Rechazado",
    Realizado="Realizado"
}
export class Appointment{
    id:string;
    timeStamp:number;
    patient:Patient;
    professional:Professional;
    specialty:Specialty;
    state:AppointmentState;
    review:string;
    comment:string;
    quiz:Iencuesta;
    

    public constructor(init?: Partial<Appointment>) {
        if(init){
            Object.assign(this, init);
        }        
    }
}
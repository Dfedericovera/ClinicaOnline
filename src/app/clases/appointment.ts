import { Patient } from './patient';
import { Professional } from './professional';
import { Specialty } from './specialty';

enum AppointmentState{
    Solicitado,
    Cancelado,
    Aceptado,
    Rechazado,
    Finalizados
}
export class Appointment{
    id:string;
    timeStamp:number;
    patient:Patient;
    professional:Professional;
    specialty:Specialty;
    state:AppointmentState;
    

    public constructor(init?: Partial<Appointment>) {
        if(init){
            Object.assign(this, init);
        }        
    }
}
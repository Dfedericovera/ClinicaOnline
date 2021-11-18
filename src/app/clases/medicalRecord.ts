import { Patient } from './patient';
import { Professional } from './professional';

export class MedicalRecord{
    id:string;
    altura:number;
    peso:number;
    temperatura:number;
    presion:number;
    timeStamp:number;
    patient:Patient;
    professional:Professional;
    

    public constructor(init?: Partial<MedicalRecord>) {
        if(init){
            Object.assign(this, init);
        }        
    }
}
export class Specialty{

    id:string;
    specialty:string;
    duration:number;

    public constructor(init?: Partial<Specialty>) {
        if(init){
            Object.assign(this, init);
        }        
    }
}
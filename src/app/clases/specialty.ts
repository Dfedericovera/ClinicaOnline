export class Specialty{
    especialty:string;
    duration:number;

    public constructor(init?: Partial<Specialty>) {
        if(init){
            Object.assign(this, init);
        }        
    }
}
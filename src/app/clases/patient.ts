export class Patient {
    public id: string;
    public name: string;
    public lastName: string;
    public photos: Array<any>;
    public email: string;

    public constructor(init?: Partial<Patient>) {
        if(init){
            Object.assign(this, init);
        }        
    }

    

    public static CrearProfesional(id: string, name: string, lastName: string,
        photos: Array<any>, email: string) :Patient {
        let patient = new Patient();
        
        patient.id = id;
        patient.name = name;
        patient.lastName = lastName;
        patient.photos = photos;
        patient.email = email;
        

        return patient;
    }


}
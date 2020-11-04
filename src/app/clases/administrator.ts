export class Administrator {
    public id: string;
    public name: string;
    public lastName: string;
    public photo: Array<any>;
    public email: string;

    public constructor(init?: Partial<Administrator>) {
        if(init){
            Object.assign(this, init);
        }        
    } 

    public static CrearProfesional(id: string, name: string, lastName: string,
        photo: Array<any>, email: string) :Administrator {
        let administrator = new Administrator();
        
        administrator.id = id;
        administrator.name = name;
        administrator.lastName = lastName;
        administrator.photo = photo;
        administrator.email = email;
        

        return administrator;
    }


}
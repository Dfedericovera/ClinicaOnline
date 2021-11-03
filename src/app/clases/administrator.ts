import { Usuario } from "./usuario";

export class Administrator extends Usuario
{
    public constructor(init?: Partial<Administrator>)
    {
        super()
        if (init)
        {
            Object.assign(this, init);
        }
    }

    public static CrearProfesional(id: string, name: string, lastName: string,
        photo: Array<any>, email: string): Administrator
    {
        let administrator = new Administrator();

        administrator.id = id;
        administrator.name = name;
        administrator.lastName = lastName;
        administrator.photos = photo;
        administrator.email = email;
        return administrator;
    }


}
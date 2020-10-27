export class Administrador {
    public id: string;
    public nombre: string;
    public apellido: string;
    public fotos: Array<any>;
    public correo: string;

    public constructor(init?: Partial<Administrador>) {
        if(init){
            Object.assign(this, init);
        }        
    }

    

    public static CrearProfesional(id: string, nombre: string, apellido: string,
        fotos: Array<any>, correo: string) :Administrador {
        let administrador = new Administrador();
        
        administrador.id = id;
        administrador.nombre = nombre;
        administrador.apellido = apellido;
        administrador.fotos = fotos;
        administrador.correo = correo;
        

        return administrador;
    }


}
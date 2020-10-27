export class Profesional {
    public id: string;
    public nombre: string;
    public apellido: string;
    public fotos: Array<any>;
    public correo: string;

    public constructor(init?: Partial<Profesional>) {
        if(init){
            Object.assign(this, init);
        }        
    }

    

    public static CrearProfesional(id: string, nombre: string, apellido: string,
        fotos: Array<any>, correo: string) :Profesional {
        let profesional = new Profesional();
        
        profesional.id = id;
        profesional.nombre = nombre;
        profesional.apellido = apellido;
        profesional.fotos = fotos;
        profesional.correo = correo;
        

        return profesional;
    }


}
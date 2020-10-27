export class Paciente {
    public id: string;
    public nombre: string;
    public apellido: string;
    public fotos: Array<any>;
    public correo: string;

    public constructor(init?: Partial<Paciente>) {
        if(init){
            Object.assign(this, init);
        }        
    }

    

    public static CrearProfesional(id: string, nombre: string, apellido: string,
        fotos: Array<any>, correo: string) :Paciente {
        let paciente = new Paciente();
        
        paciente.id = id;
        paciente.nombre = nombre;
        paciente.apellido = apellido;
        paciente.fotos = fotos;
        paciente.correo = correo;
        

        return paciente;
    }


}
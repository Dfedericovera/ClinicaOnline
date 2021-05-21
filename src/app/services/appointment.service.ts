import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Appointment } from '../clases/appointment';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

    //Este contendra una Coleccion de appointments de la DB.
    private appointmentsDB: AngularFirestoreCollection<Appointment>;
    public appointments: Array<Appointment>;  
  
    constructor(
      private db: AngularFirestore,
      private storage: AngularFireStorage
    )
    {
      this.getAppointments().subscribe(appointments =>
      {
        this.appointments = appointments;
      })
      //? Accedemos a la base de datos de firebase.
      //? Vamos a acceder la lista de appointments en la db.
      //? y se implementa la funcionalidad en el segundo argumento.
      //? La referencia que es nuestra lista de appointments, se va a ordenar por nombre.
      this.appointmentsDB = this.db.collection('/appointments', (ref) =>
        ref.orderBy('date')
      );
    }
  
    //Devuelve un Observable de tipo Appointment Array.
    getAppointments(): Observable<Appointment[]>
    {
      return this.db.collection("appointments", (ref) =>
        ref.orderBy('date')).snapshotChanges().pipe(
          map((snaps) =>
            snaps.map((snap) =>
            {
              return snap.payload.doc.data() as Appointment;
            }))
        )
    }
  
    /* 
      ordenarFecha(a:Appointment, b:Appointment) {
        if (a.fecha as  > b.fecha) {
          return 0;
        }
        if (a.fecha < b.fecha) {
          return -1;
        }
        return 1;
      }
      ordenarHora(a:Appointment, b:Appointment) {
        if (a.hora > b.hora) {
          return 0;
        }
        if (a.hora < b.hora) {
          return -1;
        }
        return 1;
      } */
    
    //Metodo para crear un nuevo Appointment en la DB
    addAppointment(patient: Appointment)
    {
      //?Con esto FireBase se encarga de todo,
      //?no hay que pensar en endpoints o si esta o no creada la tabla.
      //?Adicionamos un nuevo paciente a la tabla.
      return new Promise<Appointment>((resolve, reject) =>
      {
        this.appointmentsDB
          .add(JSON.parse(JSON.stringify(patient)))
          .then(res =>
          {
            patient.id = res.id;
            this.editAppointment(patient);
            resolve(patient);
          }, err => reject(console.error(err)));
      });
  
    }
  
    //Delete a Appointment de la DB
    deleteAppointment(patient: Appointment)
    {
      try
      {
        return this.db
          .collection("appointments")
          .doc(patient.id)
          .delete()
          .then(res => { console.log(res) });
  
      } catch (error)
      {
        console.log('Error: ', error);
      }
  
    }
  
    //Edit a Appointment
    editAppointment(newAppointment)
    {
      return this.db
        .collection("appointments")
        .doc(newAppointment.id)
        .set(newAppointment, { merge: true });
  
    }
}

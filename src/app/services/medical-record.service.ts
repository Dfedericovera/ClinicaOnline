import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MedicalRecord } from '../clases/medicalRecord';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {

  //Este contendra una Coleccion de medicalRecords de la DB.
    private medicalRecordsDB: AngularFirestoreCollection<MedicalRecord>;
    public medicalRecords: Array<MedicalRecord>;  
  
    constructor(
      private db: AngularFirestore,
    )
    {
      this.getMedicalRecords().subscribe(medicalRecords =>
      {
        this.medicalRecords = medicalRecords;
      })
      //? Accedemos a la base de datos de firebase.
      //? Vamos a acceder la lista de medicalRecords en la db.
      //? y se implementa la funcionalidad en el segundo argumento.
      //? La referencia que es nuestra lista de medicalRecords, se va a ordenar por nombre.
      this.medicalRecordsDB = this.db.collection('/medicalRecords', (ref) =>
        ref.orderBy('timeStamp')
      );
    }
  
    //Devuelve un Observable de tipo MedicalRecord Array.
    getMedicalRecords(): Observable<MedicalRecord[]>
    {
      return this.db.collection("medicalRecords", (ref) =>
        ref.orderBy('timeStamp')).snapshotChanges().pipe(
          map((snaps) =>
            snaps.map((snap) =>
            {
              /* console.log(snap.payload.doc.data()); */
              return snap.payload.doc.data() as MedicalRecord;
            }))
        )
    }
  
    /* 
      ordenarFecha(a:MedicalRecord, b:MedicalRecord) {
        if (a.fecha as  > b.fecha) {
          return 0;
        }
        if (a.fecha < b.fecha) {
          return -1;
        }
        return 1;
      }
      ordenarHora(a:MedicalRecord, b:MedicalRecord) {
        if (a.hora > b.hora) {
          return 0;
        }
        if (a.hora < b.hora) {
          return -1;
        }
        return 1;
      } */
    
    //Metodo para crear un nuevo MedicalRecord en la DB
    addMedicalRecord(medicalRecord: MedicalRecord)
    {
      //?Con esto FireBase se encarga de todo,
      //?no hay que pensar en endpoints o si esta o no creada la tabla.
      //?Adicionamos un nuevo paciente a la tabla.
      return new Promise<MedicalRecord>((resolve, reject) =>
      {
        this.medicalRecordsDB
          .add(JSON.parse(JSON.stringify(medicalRecord)))
          .then(res =>
          {
            medicalRecord.id = res.id;
            this.editMedicalRecord(medicalRecord);
            resolve(medicalRecord);
          }, err => reject(console.error(err)));
      });
  
    }
  
    //Delete a MedicalRecord de la DB
    deleteMedicalRecord(medicalRecord: MedicalRecord)
    {
      try
      {
        return this.db
          .collection("medicalRecords")
          .doc(medicalRecord.id)
          .delete()
          .then(res => { console.log(res) });
  
      } catch (error)
      {
        console.log('Error: ', error);
      }
  
    }
  
    //Edit a MedicalRecord
    editMedicalRecord(newMedicalRecord)
    {
      return this.db
        .collection("medicalRecords")
        .doc(newMedicalRecord.id)
        .set(JSON.parse(JSON.stringify(newMedicalRecord)));  
    }
}

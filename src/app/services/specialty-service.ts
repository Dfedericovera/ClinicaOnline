import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { Specialty } from '../clases/specialty';
import { FileI } from '../interface/file';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService
{
  //Este contendra una Coleccion de specialtys de la DB.
  private specialtyDB: AngularFirestoreCollection<Specialty>;
  public specialtys: Array<Specialty>;

  constructor(
    private db: AngularFirestore
  )
  {
    this.getSpecialtys().subscribe(specialtys =>
    {
      this.specialtys = specialtys;
    })
    //? Accedemos a la base de datos de firebase.
    //? Vamos a acceder la lista de specialtys en la db.
    //? y se implementa la funcionalidad en el segundo argumento.
    //? La referencia que es nuestra lista de specialtys, se va a ordenar por nombre.
    this.specialtyDB = this.db.collection('/specialtys', (ref) =>
      ref.orderBy('date')
    );
  }

  //Devuelve un Observable de tipo Specialty Array.
  getSpecialtys(): Observable<Specialty[]>
  {
    return this.db.collection("specialtys").snapshotChanges().pipe(
        map((snaps) =>
          snaps.map((snap) =>
          {
            return snap.payload.doc.data() as Specialty;
          }))
      )
  }
/* 
  createSpecialty(specialty: Specialty, photos: Array<FileI>)
  {
    return this.addSpecialty(specialty).then(specialtyCallback =>
    {
      console.log('Specialty created');
      return specialtyCallback;
    })

  } */

  //Metodo para crear un nuevo Specialty en la DB
  addSpecialty(specialty: Specialty)
  {
    //?Con esto FireBase se encarga de todo,
    //?no hay que pensar en endpoints o si esta o no creada la tabla.
    //?Adicionamos un nuevo paciente a la tabla.
    return new Promise<Specialty>((resolve, reject) =>
    {
      this.specialtyDB
        .add(JSON.parse(JSON.stringify(specialty)))
        .then(res =>
        {
          specialty.id = res.id;
          this.editSpecialty(JSON.parse(JSON.stringify(specialty)));
          resolve(specialty);
        }, err => reject(console.error(err)));
    });

  }

  //Delete a Specialty de la DB
  deleteSpecialty(specialty: Specialty)
  {
    try
    {
      return this.db
        .collection("specialtys")
        .doc(specialty.id)
        .delete()
        .then(res => { console.log(res) });

    } catch (error)
    {
      console.log('Error: ', error);
    }

  }

  //Edit a Specialty
  editSpecialty(newSpecialty)
  {
    return this.db
      .collection("specialtys")
      .doc(newSpecialty.id)
      .set(newSpecialty, { merge: true });

  }
}

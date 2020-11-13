import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { Professional } from '../clases/professional';
import { FileI } from '../interface/file';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService
{


  //Este contendra una Coleccion de professionals de la DB.
  private professionalsDB: AngularFirestoreCollection<Professional>;
  public professionals: Array<Professional>;
  private filePath: any;
  private downloadURL: Observable<string>;


  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  )
  {
    this.getProfessionals().subscribe(professionals =>
    {
      this.professionals = professionals;
    })
    //? Accedemos a la base de datos de firebase.
    //? Vamos a acceder la lista de professionals en la db.
    //? y se implementa la funcionalidad en el segundo argumento.
    //? La referencia que es nuestra lista de professionals, se va a ordenar por nombre.
    this.professionalsDB = this.db.collection('/professionals', (ref) =>
      ref.orderBy('date')
    );
  }
  //Devuelve un Observable de tipo Professional Array.
  getProfessionals(): Observable<Professional[]>
  {
    return this.db.collection("professionals").snapshotChanges().pipe(
      map((snaps) =>
        snaps.map((snap) =>
        {
          return snap.payload.doc.data() as Professional;
        }))
    )
  }

  /* 
    ordenarFecha(a:Professional, b:Professional) {
      if (a.fecha as  > b.fecha) {
        return 0;
      }
      if (a.fecha < b.fecha) {
        return -1;
      }
      return 1;
    }
    ordenarHora(a:Professional, b:Professional) {
      if (a.hora > b.hora) {
        return 0;
      }
      if (a.hora < b.hora) {
        return -1;
      }
      return 1;
    } */

  createProfessional(professional: Professional, photos: Array<FileI>)
  {
    return this.addProfessional(professional).then(professionalCallback =>
    {
      console.log('Professional created');
      photos.forEach(photo =>
      {
        this.uploadImage(professional, photo);
      })
      return professionalCallback;
    })

  }

  //Metodo para crear un nuevo Professional en la DB
  private addProfessional(professional: Professional)
  {
    //?Con esto FireBase se encarga de todo,
    //?no hay que pensar en endpoints o si esta o no creada la tabla.
    //?Adicionamos un nuevo paciente a la tabla.
    return new Promise<Professional>((resolve, reject) =>
    {
      this.professionalsDB.doc(professional.id)
        .set(JSON.parse(JSON.stringify(professional)))
        .then(res =>
        {
          resolve(professional);
        }, err => reject(console.error(err)));
    });

  }

  //Delete a Professional de la DB
  deleteProfessional(professional: Professional)
  {
    try
    {
      return this.db
        .collection("professionals")
        .doc(professional.id)
        .delete()
        .then(res => { console.log(res) });

    } catch (error)
    {
      console.log('Error: ', error);
    }

  }

  //Edit a Professional
  editProfessional(newProfessional)
  {
    return this.db
      .collection("professionals")
      .doc(newProfessional.id)
      .set(newProfessional, { merge: true });

  }

  private uploadImage(professional: Professional, image: FileI)
  {
    this.filePath = `professionals/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() =>
        {
          fileRef.getDownloadURL().subscribe(urlImage =>
          {
            this.downloadURL = urlImage;
            professional.photos = new Array;
            professional.photos.push(this.downloadURL);
            /* console.log('URL_image', urlImage); */
            this.editProfessional(professional).then(() => console.log('Updated photo'));
          });
        })
      ).subscribe();
  }
}

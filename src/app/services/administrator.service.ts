import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { Administrator } from '../clases/administrator';
import { FileI } from '../interface/file';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService
{

  //Este contendra una Coleccion de administrators de la DB.
  private administratorsDB: AngularFirestoreCollection<Administrator>;
  public administrators: Array<Administrator>;
  private filePath: any;
  private downloadURL: Observable<string>;


  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  )
  {
    this.getAdministrators().subscribe(administrators =>
    {
      this.administrators = administrators;
    })
    //? Accedemos a la base de datos de firebase.
    //? Vamos a acceder la lista de administrators en la db.
    //? y se implementa la funcionalidad en el segundo argumento.
    //? La referencia que es nuestra lista de administrators, se va a ordenar por nombre.
    this.administratorsDB = this.db.collection('/usuarios', (ref) =>
      ref.orderBy('name')
    );
  }
  //Devuelve un Observable de tipo Administrator Array.
  getAdministrators(): Observable<Administrator[]>
  {
    return this.db.collection("usuarios").snapshotChanges().pipe(
      map((snaps) =>
        snaps.map((snap) =>
        {
          return snap.payload.doc.data() as Administrator;
        }))
    )
  }

    //Devuelve un Administrator.
    async getAdministratorById(id: string)
    {
      try
      {
        const administratorPromise = await this.db
          .collection("usuarios")
          .doc(id)
          .get()
          /* .subscribe(value=>{
            return value.data()
          }) */
          .toPromise()
          .then((doc) =>
          {
            if (doc.exists)
            {
              // Convert to Administrator object
              var administrator = doc.data() as Administrator;
              return new Administrator(administrator);
            }
          })
        return administratorPromise;
      } catch (error)
      {
        console.log('Error: ', error);
      }
    }

  /* 
    ordenarFecha(a:Administrator, b:Administrator) {
      if (a.fecha as  > b.fecha) {
        return 0;
      }
      if (a.fecha < b.fecha) {
        return -1;
      }
      return 1;
    }
    ordenarHora(a:Administrator, b:Administrator) {
      if (a.hora > b.hora) {
        return 0;
      }
      if (a.hora < b.hora) {
        return -1;
      }
      return 1;
    } */

  createAdministrator(administrator: Administrator, photos: Array<FileI>)
  {
    return this.addAdministrator(administrator).then(administratorCallback =>
    {
      console.log('Administrator created');
      photos.forEach(photo =>
      {
        this.uploadImage(administrator, photo);
      })
      return administratorCallback;
    })

  }

  //Metodo para crear un nuevo Administrator en la DB
  private addAdministrator(administrator: Administrator)
  {
    //?Con esto FireBase se encarga de todo,
    //?no hay que pensar en endpoints o si esta o no creada la tabla.
    //?Adicionamos un nuevo paciente a la tabla.
    return new Promise<Administrator>((resolve, reject) =>
    {
      this.administratorsDB.doc(administrator.id)
        .set(JSON.parse(JSON.stringify(administrator)))
        .then(res =>
        {
          resolve(administrator);
        }, err => reject(console.error(err)));
    });

  }

  //Delete a Administrator de la DB
  deleteAdministrator(administrator: Administrator)
  {
    try
    {
      return this.db
        .collection("usuarios")
        .doc(administrator.id)
        .delete()
        .then(res => { console.log(res) });

    } catch (error)
    {
      console.log('Error: ', error);
    }

  }

  //Edit a Administrator
  editAdministrator(newAdministrator)
  {
    return this.db
      .collection("usuarios")
      .doc(newAdministrator.id)
      .set(newAdministrator, { merge: true });

  }

  private uploadImage(administrator: Administrator, image: FileI)
  {
    this.filePath = `administrators/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() =>
        {
          fileRef.getDownloadURL().subscribe(urlImage =>
          {
            this.downloadURL = urlImage;
            administrator.photos = new Array;
            administrator.photos.push(this.downloadURL);
            /* console.log('URL_image', urlImage); */
            this.editAdministrator(administrator).then(() => console.log('Updated photo'));
          });
        })
      ).subscribe();
  }
}

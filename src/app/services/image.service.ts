import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { storage} from "firebase";
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Patient } from '../clases/patient';
import { FileI } from '../interface/file';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private filePath: any;
  public downloadURL:Observable<string>;

  constructor(
    private firestore: AngularFirestore,
    private storage:AngularFireStorage
    ) { }

  //llama al servicio para subir una imagenf
  agregarImagen(id, patient:Patient) {

    storage().ref('pictures/' + id).getDownloadURL().then(data => {
      this.firestore.collection('imagenes').add({ id: data, fecha: Date.now(), autor: patient.id }).then(data => { console.log(data) });
      console.log(data);
    })
  }

  uploadImage( image: FileI) {    
    this.filePath = `patients/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadURL = urlImage;
            console.log('URL_image', urlImage);
            /* this.savePost(post); */
          });
        })
      ).subscribe();
  }

}

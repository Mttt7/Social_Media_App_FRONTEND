import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private store: AngularFireStorage) { }



  getImageFromStore(imagePath: String) {
    imagePath = imagePath?.toString();
    if (imagePath == null || imagePath == '') {

      return of(null);
    }
    return this.store.ref(imagePath.toString()).getDownloadURL()
  }

}

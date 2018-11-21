import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  key;
  zone_name;


  constructor(private fs: AngularFirestore) {

  }

  tournament_key(key) {
    this.key = key;
  }

  get_tournament_key() {
    return this.key;
  }

  get_tournament_name() {
    
    let tournament = this.fs.doc(`tournaments/${this.key}`);
    let tournament$ : Observable<any> = tournament.valueChanges();

    return tournament$;
  }

}

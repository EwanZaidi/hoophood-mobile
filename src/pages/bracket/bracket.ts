import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the BracketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bracket',
  templateUrl: 'bracket.html',
})
export class BracketPage {

  category= 'Lelaki';
  matchL : Observable<any>;
  matchP : Observable<any>;
  zone='';
  nozone : Boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fs:AngularFirestore) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BracketPage');
  }

  zonechanged(event){
    this.nozone = false;
    let matches : AngularFirestoreCollection<any> = this.fs.collection('matches', ref=> ref.where('zone', '==', event).where('category', '==', 'Lelaki'));
    this.matchL = matches.snapshotChanges().map(mt => {
      let matches = mt.filter(f=>f.payload.doc.data().description!=="Group")
      return matches.map(m => {
        const data = m.payload.doc.data();
        const id = m.payload.doc.id;
        return {data,id};
      })

    })

    let matchesP : AngularFirestoreCollection<any> = this.fs.collection('matches', ref=> ref.where('zone', '==', event).where('category', '==', 'Perempuan'))
    this.matchP = matchesP.snapshotChanges().map(mt => {
      return mt.map(m => {
        const data = m.payload.doc.data();
        const id = m.payload.doc.id;

        return {data,id};
      })
    })
  }

}

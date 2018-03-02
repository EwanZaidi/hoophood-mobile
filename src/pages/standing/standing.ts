import { Observable } from 'rxjs/Observable';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the StandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-standing',
  templateUrl: 'standing.html',
})
export class StandingPage {

  groupsL: AngularFirestoreCollection<any>;
  groupL: Observable<any>;

  groupsP: AngularFirestoreCollection<any>;
  groupP: Observable<any>;

  show : Boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fs : AngularFirestore) {
  }

  ionViewDidLoad() {
    
  }

  zonechanged(event){
    this.groupsL = this.fs.collection('groups', ref => ref.where('category', '==', 'Lelaki').where('zone', '==', event));
    this.groupL = this.groupsL.snapshotChanges().map(g => {
      return g.map(z => {
        const data = z.payload.doc.data();
        const id = z.payload.doc.id;
        let teamList = this.fs.collection('groups/'+id+'/team_list', ref => {return ref.orderBy('pos').orderBy('points', 'desc')}).snapshotChanges().map(x=> {
          return x.map(c=> {
            const data = c.payload.doc.data();
            const id = c.payload.doc.id;

            return {id,data};
          })
        })

        return {id,data,teamList}
      })
    })

    this.groupsP = this.fs.collection('groups', ref => ref.where('category', '==', 'Perempuan').where('zone', '==', event));
    this.groupP = this.groupsP.snapshotChanges().map(g => {
      return g.map(z => {
        const data = z.payload.doc.data();
        const id = z.payload.doc.id;
        let teamList = this.fs.collection('groups/'+id+'/team_list', ref => {return ref.orderBy('pos').orderBy('points', 'desc')}).snapshotChanges().map(x=> {
          return x.map(c=> {
            const data = c.payload.doc.data();
            const id = c.payload.doc.id;

            return {id,data};
          })
        })

        return {id,data,teamList}
      })
    })

    this.show = true;
  }



}

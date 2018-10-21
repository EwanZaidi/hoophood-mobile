import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the GroupDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-details',
  templateUrl: 'group-details.html',
})
export class GroupDetailsPage {
  
  data: any;
  id: any;

  details: AngularFirestoreCollection<any>;
  detail: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: AngularFirestore) {
  }

  ionViewDidLoad() {
    this.data = this.navParams.get('data');
    this.id = this.navParams.get('id');

    this.details = this.afs.collection('groups/'+this.id+'/team_list/', ref=> ref.orderBy('pos'));
    this.detail = this.details.snapshotChanges().map(f => {
      return f.map(g => {
        const id = g.payload.doc.id;
        const data = g.payload.doc.data();

        let det = this.afs.collection('groups/'+this.id+'/team_list/'+id+'/game_details').snapshotChanges().map(f=> {
          return f.map(g => {
            const id = g.payload.doc.id;
            const data = g.payload.doc.data();

            return {id, data}
          })
        })
        return {id, data, det}
      })
    })
  }

}

import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { GroupDetailsPage } from '../group-details/group-details';
import { StorageProvider } from '../../providers/storage/storage';
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

  show: Boolean = false;
  nozone: Boolean = true;

  now_zone;

  constructor(platform: Platform, private storage: StorageProvider,public navCtrl: NavController, public navParams: NavParams, private fs: AngularFirestore) {
    platform.ready().then(() => {
      let key = this.storage.get_tournament_key();
      let zone = this.storage.get_tournament_name();

      zone.subscribe(x => {
        this.now_zone = `${x.tournament_name.toUpperCase()} - STANDINGS`;
      })

      this.nozone = false;
      this.groupsL = this.fs.collection('groups', ref => ref.where('category', '==', 1).where('tournament_id', '==', key).orderBy(`group_name`));
      this.groupL = this.groupsL.snapshotChanges().map(g => {
        return g.map(z => {
          const data = z.payload.doc.data();
          const id = z.payload.doc.id;
          let teamList = this.fs.collection('groups/' + id + '/teams_list', ref => { return ref.orderBy('points', 'desc').orderBy('gd', 'desc') }).snapshotChanges().map(x => {
            return x.map(c => {
              const data = c.payload.doc.data();
              const id = c.payload.doc.id;

              let name = this.fs.doc(`teams/${id}`).valueChanges();

              return { id, data, name };
            })
          })

          return { id, data, teamList }
        })
      })

      


      this.groupsP = this.fs.collection('groups', ref => ref.where('category', '==', 2).where('tournament_id', '==', key).orderBy(`group_name`));
      this.groupP = this.groupsP.snapshotChanges().map(g => {
        return g.map(z => {
          const data = z.payload.doc.data();
          const id = z.payload.doc.id;
          let teamList = this.fs.collection('groups/' + id + '/teams_list', ref => { return ref.orderBy('points', 'desc').orderBy('gd', 'desc') }).snapshotChanges().map(x => {
            return x.map(c => {
              const data = c.payload.doc.data();
              const id = c.payload.doc.id;

              let name = this.fs.doc(`teams/${id}`).valueChanges();

              return { id, data, name };
            })
          })

          return { id, data, teamList }
        })
      })

      this.show = true;
    })
  }

  ionViewDidLoad() {
    let idx = 2;
    window.localStorage.setItem('index', idx.toString());
  }

  detail(group) {
    this.navCtrl.push(GroupDetailsPage, { id: group.id, data: group.data });
  }

  zonechanged(event) {
  }

  doRefresh() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }



}

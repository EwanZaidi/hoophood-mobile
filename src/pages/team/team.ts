import { TeamDetailsPage } from './../team-details/team-details';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class TeamPage {

  teamsL: AngularFirestoreCollection<any>;
  teamL: Observable<any>;

  teamsP: AngularFirestoreCollection<any>;
  teamP: Observable<any>;

  show: Boolean = false;

  constructor(platform: Platform, public navCtrl: NavController, public navParams: NavParams, private fs: AngularFirestore) {

    platform.ready().then(() => {
      let idx = 4;
      window.localStorage.setItem('index', idx.toString());
      let myzone = window.localStorage.getItem('zone');

      this.teamsL = this.fs.collection('teams', ref => ref.where('category', '==', 'Lelaki').where('zone', '==', myzone).where('is_confirm', '==', true));
      this.teamL = this.teamsL.snapshotChanges().map(t => {
        return t.map(x => {
          const data = x.payload.doc.data();
          const id = x.payload.doc.id;

          return { data, id };
        })
      })

      this.teamsP = this.fs.collection('teams', ref => ref.where('category', '==', 'Perempuan').where('zone', '==', myzone).where('is_confirm', '==', true));
      this.teamP = this.teamsP.snapshotChanges().map(t => {
        return t.map(x => {
          const data = x.payload.doc.data();
          const id = x.payload.doc.id;

          return { data, id };
        })
      })

      this.show = true;
    })


  }

  ionViewDidLoad() {

  }

  selectteam(team) {
    this.navCtrl.push(TeamDetailsPage, { id: team.id, data: team.data });
  }
}

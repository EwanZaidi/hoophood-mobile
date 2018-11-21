import { TeamDetailsPage } from './../team-details/team-details';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';

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
  now_zone;

  constructor(platform: Platform, public navCtrl: NavController, private storage: StorageProvider, public navParams: NavParams, private fs: AngularFirestore) {

    platform.ready().then(() => {
      let key = this.storage.get_tournament_key();
      let zone = this.storage.get_tournament_name();

      zone.subscribe(x => {
        this.now_zone = `${x.tournament_name.toUpperCase()} - TEAMS`;
      })

      this.teamsL = this.fs.collection('teams', ref => ref.where('category', '==', 1).where('tournament_id', '==', key));
      this.teamL = this.teamsL.snapshotChanges().map(t => {
        return t.map(x => {
          const data = x.payload.doc.data();
          const id = x.payload.doc.id;

          return { data, id };
        })
      })

      this.teamsP = this.fs.collection('teams', ref => ref.where('category', '==', 2).where('tournament_id', '==', key));
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

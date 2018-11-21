import { GameDetailsPage } from './../game-details/game-details';
import { Component, OnChanges } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform, AlertController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-games',
  templateUrl: 'games.html',
})
export class GamesPage implements OnChanges {

  matches: AngularFirestoreCollection<any>;
  match: Observable<any>;

  show: Boolean = false;
  nozone: Boolean = true;

  a: Boolean[] = new Array();

  now_zone;
  zon;

  home: Boolean[] = new Array();
  away: Boolean[] = new Array();

  tournament : AngularFirestoreDocument<any>;
  tournament$ : Observable<any>;



  zone = [{ id: 'Central' }, { id: 'South' }, { id: 'North' }, { id: 'East' }];

  constructor(platform: Platform, private storage:StorageProvider, public navCtrl: NavController, public navParams: NavParams, private fs: AngularFirestore, public load: LoadingController, public alt: AlertController) {
    platform.ready().then(() => {
      let key = this.storage.get_tournament_key();
      const date = new Date();
      this.nozone = false;
      this.matches = this.fs.collection('matches', ref => ref.where('tournament_id', '==', key).orderBy('match_no'));
      this.match = this.matches.snapshotChanges().map(m => {
        m.forEach(mt => {
          let i = mt.payload.newIndex;
          let a = mt.payload.doc.data();
          let gameDate = a.datetime;
          if(a.home_team_score > a.away_team_score){
            this.home[i] = true;
            this.away[i] = false;
          }else if(a.away_team_score > a.home_team_score){
            this.away[i] = true;
            this.home[i] = false;
          }
          
          gameDate.setMinutes(gameDate.getMinutes() + 30);
          if (date > gameDate) {
            this.a[i] = true;
          } else {
            this.a[i] = false;
          }
        })

        return m.map(x => {
          const data = x.payload.doc.data();
          const id = x.payload.doc.id;

          let homeName = this.fs.doc(`teams/${data.home_team}`).valueChanges();
          let awayName = this.fs.doc(`teams/${data.away_team}`).valueChanges();

          return { data, id, homeName, awayName};
        })
      })

      this.tournament = this.fs.doc(`tournaments/${key}`);
      this.tournament$ = this.tournament.valueChanges();

      this.tournament$.subscribe(x => {
        this.now_zone = `${x.tournament_name.toUpperCase()} - MATCHES`;
      })

    })

  }

  ngOnChanges() {
  }

  ionViewDidLoad() {
  }

  navigate(details) {
    this.navCtrl.push(GameDetailsPage, { id: details.id, data: details.data });
  }

  zonechanged(event) {

  }

  doRefresh() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

}

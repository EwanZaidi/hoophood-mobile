import { GameDetailsPage } from './../game-details/game-details';
import { Component, OnChanges } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform, AlertController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

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

  home: Boolean[] = new Array();
  away: Boolean[] = new Array();



  zone = [{ id: 'Central' }, { id: 'South' }, { id: 'North' }, { id: 'East' }];

  constructor(platform: Platform, public navCtrl: NavController, public navParams: NavParams, private fs: AngularFirestore, public load: LoadingController, public alt: AlertController) {
    platform.ready().then(() => {
      let idx = 1;
      window.localStorage.setItem('index', idx.toString());
      let myzone = window.localStorage.getItem('zone');
      const date = new Date();
      this.nozone = false;
      this.now_zone = 'ZON ' + myzone.toUpperCase() + ' - MATCHES';
      this.matches = this.fs.collection('matches', ref => ref.orderBy('match_no').where('zone', '==', myzone));
      this.match = this.matches.snapshotChanges().map(m => {
        m.forEach(mt => {
          let i = mt.payload.newIndex;
          let a = mt.payload.doc.data();
          let gameDate = a.datetime;
          if(a.team1_score > a.team2_score){
            this.home[i] = true;
            this.away[i] = false;
          }else if(a.team2_score > a.team1_score){
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
          return { data, id };
        })
      })
    })

  }

  ngOnChanges() {
  }

  ionViewDidLoad() {
  }

  navigate(details) {
    let loading = this.load.create({
      spinner: 'bubbles',
    });
    loading.present();
    setTimeout(() => {
      this.navCtrl.push(GameDetailsPage, { id: details.id, data: details.data });
    }, 2000);
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  zonechanged(event) {

  }

}

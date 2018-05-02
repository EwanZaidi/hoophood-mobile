
import { Component } from '@angular/core';
import { NavController, NavParams, Platform, App, ViewController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { StatisticsPage } from '../statistics/statistics';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'page-game-details',
  templateUrl: 'game-details.html',
})
export class GameDetailsPage {


  data: any;
  id: any;

  tba: Boolean;
  group;

  edit: Boolean = false;

  team1_scorer: AngularFirestoreCollection<any>;
  team1_scorer$: Observable<any>;

  team2_scorer: AngularFirestoreCollection<any>;
  team2_scorer$: Observable<any>;

  team1_3ptr: AngularFirestoreCollection<any>;
  team1_3ptr$: Observable<any>;

  team2_3ptr: AngularFirestoreCollection<any>;
  team2_3ptr$: Observable<any>;

  constructor(public view: ViewController, public navCtrl: NavController, public navParams: NavParams, private auth: AngularFireAuth, private fs: AngularFirestore, private sc: ScreenOrientation, private platform: Platform, private app: App) {

  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.data = this.navParams.get('data');

    if (this.data.team1_name == 'TBA') {
      this.tba = true;
    } else {
      this.tba = false;
    }

    let team_id = window.localStorage.getItem('team_id');

    console.log(team_id);

    if (this.data.team1_id == team_id || this.data.team2_id == team_id) {
      this.edit = true;
    } else {
      this.edit = false;
    }

    if (this.data.group != undefined) {
      this.splitvalue(this.data.group)
    }

    this.team1_scorer = this.fs.collection('matches').doc(this.id).collection('team1_scorer', ref => ref.orderBy('points', 'desc'));
    this.team1_scorer$ = this.team1_scorer.valueChanges();

    this.team2_scorer = this.fs.collection('matches').doc(this.id).collection('team2_scorer', ref => ref.orderBy('points', 'desc'));
    this.team2_scorer$ = this.team2_scorer.valueChanges();

    this.team1_3ptr = this.fs.collection('matches').doc(this.id).collection('team1_3ptr', ref => ref.orderBy('points', 'desc'));
    this.team1_3ptr$ = this.team1_3ptr.valueChanges();

    this.team2_3ptr = this.fs.collection('matches').doc(this.id).collection('team2_3ptr', ref => ref.orderBy('points', 'desc'));
    this.team2_3ptr$ = this.team2_3ptr.valueChanges();
  }

  splitvalue(data) {
    if (data.substring(0, 2) == 'st') {
      this.group = data.substring(2, 3)
    } else {
      this.group = data.substring(3, 5)
    }

  }

  statsPage() {
    // this.navCtrl.setRoot(StatisticsPage, {id: this.id, data: this.data})
    this.view.dismiss();
    this.app.getRootNav().push(StatisticsPage, { id: this.id, data: this.data });
  }


}

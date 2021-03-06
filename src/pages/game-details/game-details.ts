
import { Component } from '@angular/core';
import { NavController, NavParams, Platform, App, ViewController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { StatisticsPage } from '../statistics/statistics';

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

  category: Boolean;

  constructor(public view: ViewController, public navCtrl: NavController, public navParams: NavParams, private auth: AngularFireAuth, private fs: AngularFirestore, private platform: Platform, private app: App, private alt: AlertController) {

  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.data = this.navParams.get('data');

    let zone = window.localStorage.getItem('zone');

    console.log(zone);
    

    if(zone == 'Alumni 2018'){
      this.category = true;
    }

    if (this.data.description !== 'Group' && this.id == null) {
      let a = this.data.datetime;
      a.setMinutes(a.getMinutes() - 30);
    }

    if (this.data.team1_name == 'TBA') {
      this.tba = true;
    } else {
      this.tba = false;
    }

    let team_id = window.localStorage.getItem('team_id');

    if (this.data.team1_id == team_id || this.data.team2_id == team_id) {
      this.edit = true;
    } else {
      this.edit = false;
    }

    if (this.data.group != undefined) {
      this.splitvalue(this.data.group)
    }
  }

  splitvalue(data) {
    if (data.substring(0, 2) == 'st') {
      this.group = data.substring(2, 3)
    } else {
      this.group = data.substring(3, 5)
    }

  }

  statsPage() {
    this.view.dismiss();
    this.app.getRootNav().push(StatisticsPage, { id: this.id, data: this.data });
  }


}

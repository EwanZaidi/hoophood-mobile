
import { Component } from '@angular/core';
import { NavController, NavParams, Platform, App, ViewController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
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

  tba : Boolean;
  group;

  edit : Boolean = false;

  constructor(public view: ViewController,public navCtrl: NavController, public navParams: NavParams, private auth : AngularFireAuth, private fs: AngularFirestore, private sc: ScreenOrientation, private platform: Platform, private app: App) {
    
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.data = this.navParams.get('data');

    if(this.data.team1_name == 'TBA'){
      this.tba = true;
    }else{
      this.tba = false;
    }

    let team_id = window.localStorage.getItem('team_id');

    console.log(team_id);

    if(this.data.team1_id == team_id || this.data.team2_id == team_id){
      this.edit = true;
    }else{
      this.edit = false;
    }

    if(this.data.group != undefined){
    this.splitvalue(this.data.group)}
  }

  splitvalue(data){
    if(data.substring(0,2) == 'st'){
      this.group = data.substring(2,3)
    }else{
      this.group = data.substring(3,4)
    }
    
  }

  statsPage(){
    // this.navCtrl.setRoot(StatisticsPage, {id: this.id, data: this.data})
    this.view.dismiss();
    this.app.getRootNav().push(StatisticsPage, {id: this.id, data: this.data});
  }


}


import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth : AngularFireAuth, private fs: AngularFirestore) {
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

    // this.auth.authState.subscribe(x => {
    //   let uid = x.uid;
    //   let a : AngularFirestoreDocument<any> = this.fs.collection('users').doc(uid);
    //   let b : Observable<any> = a.valueChanges();

    //   b.subscribe(x => {
    //     if(this.data.team1_id == x.team_id || this.data.team2_id == x.team_id){
    //       this.edit = true;
    //     }else{
    //       this.edit = false;
    //     }
    //   })
    // })

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


}

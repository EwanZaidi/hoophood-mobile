
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the GameDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-game-details',
  templateUrl: 'game-details.html',
})
export class GameDetailsPage {


  data: any;
  id: any;

  tba : Boolean;
  group;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.data = this.navParams.get('data');

    if(this.data.team1_name == 'TBA'){
      this.tba = true;
    }else{
      this.tba = false;
    }

    if(this.data.group != undefined){
    this.splitvalue(this.data.group)}
  }

  splitvalue(data){
    this.group = data.substring(2,3)
  }


}

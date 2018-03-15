
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.data = this.navParams.get('data');
  }


}

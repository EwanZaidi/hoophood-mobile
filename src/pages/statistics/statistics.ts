import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ModalController, ViewController, App } from 'ionic-angular';
// import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { GameDetailsPage } from '../game-details/game-details';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the StatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {
  id: any;
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private modal: ModalController, public app: App, public view: ViewController) {
    
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.data = this.navParams.get('data');
  }

  home(){
    this.view.dismiss();
  }


}

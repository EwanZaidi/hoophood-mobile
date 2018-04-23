import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private sc: ScreenOrientation, private platform: Platform) {
    // sc.lock(sc.ORIENTATIONS.LANDSCAPE)
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.data = this.navParams.get('data');
  }


}

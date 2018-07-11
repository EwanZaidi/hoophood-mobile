import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Braintree, ApplePayOptions, PaymentUIOptions } from '@ionic-native/braintree';

/**
 * Generated class for the NbaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nba',
  templateUrl: 'nba.html',
})
export class NbaPage {

  BRAINTREE_TOKEN = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private braintree: Braintree) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NbaPage');
  }

}

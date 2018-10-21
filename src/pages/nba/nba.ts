import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ViewController } from 'ionic-angular';
import { NbaRegPage } from '../nba-reg/nba-reg';
import { NewsletterPage } from '../newsletter/newsletter';

// import { Braintree, ApplePayOptions, PaymentUIOptions } from '@ionic-native/braintree';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alt: AlertController, public modal:ModalController, public view: ViewController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NbaPage');
  }

  nbaRegistration(){
    this.modal.create(NewsletterPage, null, { cssClass: 'inset-modal' }).present();
  }

}

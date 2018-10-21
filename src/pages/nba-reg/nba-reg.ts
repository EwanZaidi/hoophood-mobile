import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import {AngularFirestore} from 'angularfire2/firestore';
/**
 * Generated class for the NbaRegPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nba-reg',
  templateUrl: 'nba-reg.html',
})
export class NbaRegPage {

  todo = {fullname: '', email:'', phone:'', nickname:''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private fs: AngularFirestore, private alt: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NbaRegPage');
  }

  logForm() {
    this.fs.collection('nba').add({
      name: this.todo.fullname,
      email: this.todo.email,
      phone: this.todo.phone,
      nickname: this.todo.nickname,
      payment: false
    }).then(() => {
      let alert = this.alt.create({
        title: `Registered`,
        subTitle: `Thanks ${this.todo.nickname.toUpperCase()}, for payment/confirmation, we will contact you shortly.`,
        buttons: ['Dismiss'],
      })
      alert.present();
    })
  }

}

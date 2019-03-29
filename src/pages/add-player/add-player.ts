import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the AddPlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-player',
  templateUrl: 'add-player.html',
})
export class AddPlayerPage {

  team_id;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: AngularFirestore, private alertCtrl: AlertController, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.team_id = window.localStorage.getItem('team_id');
  }

  confirmAddPlayer(form){
    this.afs.collection(`teams`).doc(`${this.team_id}`).collection('players').add({
      is_selected : false,
      player_ic: form.value.id,
      player_jersey: form.value.jersey,
      player_name: form.value.name
    }).then(() => {
      this.successAlert();
      this.viewCtrl.dismiss();
    }).catch((err) => {
      this.errorAlert(err);
    })
  }

  successAlert() {
    const alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'Player has been added to your team!',
    });

    alert.present();
  }

  errorAlert(err) {
    const alert = this.alertCtrl.create({
      title: `${err}`
    });

    alert.present();
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the EditPlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-player',
  templateUrl: 'edit-player.html',
})
export class EditPlayerPage {

  player: Observable<any>;
  key;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs:AngularFirestore, private alertCtrl: AlertController, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.key = this.navParams.get('key');
    let a = this.afs.collection(`teams`).doc(`${window.localStorage.getItem('team_id')}`).collection(`players`).doc(this.key);
    this.player = a.valueChanges();
  }

  confirmEditPlayer(form){

    this.afs.collection(`teams`).doc(`${window.localStorage.getItem('team_id')}`).collection(`players`).doc(this.key).update({
      is_selected : form.value.is_selected == 'true' ? true : false,
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
      subTitle: 'Player has been updated!',
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

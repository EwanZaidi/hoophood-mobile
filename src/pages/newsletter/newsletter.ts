import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {NgForm} from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { NbaRegPage } from '../nba-reg/nba-reg';

/**
 * Generated class for the NewsletterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newsletter',
  templateUrl: 'newsletter.html',
})
export class NewsletterPage {

  myParam: string;
  uid: string;

  constructor(
    public viewCtrl: ViewController,
    params: NavParams,
    private fs: AngularFirestore,
    public nav: NavController
  ) {
    this.uid = window.localStorage.getItem('uid')
    this.myParam = params.get('myParam');
  }

  submit(form){
    this.fs.collection('device').doc(this.uid).update({
      email: form.value.email
    }).then(()=> {
      this.viewCtrl.dismiss();
    })
  }

  nbaRegistration(){
    this.nav.push(NbaRegPage);
  }

  modalDismiss(){
    this.viewCtrl.dismiss();
  }

}

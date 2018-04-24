import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {NgForm} from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

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
  token: string;

  constructor(
    public viewCtrl: ViewController,
    params: NavParams,
    private fs: AngularFirestore
  ) {
    this.token = window.localStorage.getItem('token')
    this.myParam = params.get('myParam');
  }

  submit(form){
    this.fs.collection('token').doc(this.token).update({
      email: form.value.email
    }).then(()=> {
      this.viewCtrl.dismiss();
    })
  }

}

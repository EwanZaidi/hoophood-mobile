import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {AngularFireAuth} from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  err : any;

  constructor(private alert: AlertController,public navCtrl: NavController, public navParams: NavParams, private auth:AngularFireAuth, private fs: AngularFirestore) {
  }

  ionViewDidLoad() {
    
  }

  login(loginForm){

    let a : AngularFirestoreCollection<any> = this.fs.collection('login', ref => ref.where('username', '==', loginForm.value.teamName));
    let b : Observable<any> = a.valueChanges();

    b.subscribe(x => {
      if(x.length > 0){
        if(x[0].password == loginForm.value.password){
          window.localStorage.setItem('team_name', x[0].username);
          window.localStorage.setItem('team_id', x[0].team_id);
          this.navCtrl.setRoot(TabsPage);
        }else{
          this.err = 'Password incorrect, please re-login';
          this.presentAlert();
        }
      }else{
        this.err = 'Team name not found !'
        this.presentAlert();
      }
    })
  }

  presentAlert() {
    let alert = this.alert.create({
      title: 'Authentication Failure',
      subTitle: this.err,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  back(){
    this.navCtrl.setRoot(TabsPage);
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {AngularFireAuth} from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../providers/auth.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  err : any;

  constructor(private alert: AlertController,public navCtrl: NavController, public navParams: NavParams, private auth:AngularFireAuth, private fs: AngularFirestore, private authSvc: AuthService) {
  }

  ionViewDidLoad() {
    
  }

  login(loginForm){

    let a : AngularFirestoreCollection<any> = this.fs.collection('login', ref => ref.where('username', '==', loginForm.value.teamName));
    let b : Observable<any> = a.valueChanges();

    b.subscribe(x => {
      if(x.length > 0){
        if(x[0].password == loginForm.value.password){
          this.authSvc.login(x[0].username, x[0].team_id);
          this.navCtrl.setRoot(HomePage);
        }else{
          let err = 'Password incorrect, please re-login';
          this.presentAlert(err);
        }
      }else{
        let err = 'Team name not found !'
        this.presentAlert(err);
      }
    })
  }

  presentAlert(err : string) {
    let alert = this.alert.create({
      title: 'Authentication Failure',
      subTitle: err,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  anonymous(){
    this.navCtrl.setRoot(HomePage);
  }

}

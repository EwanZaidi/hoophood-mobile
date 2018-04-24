import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, ModalController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { NewsletterPage } from '../pages/newsletter/newsletter';

import { FCM } from '@ionic-native/fcm';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('mycontent') nav: NavController;
  rootPage:any = TabsPage;
  team_name : any;
  token;

  user: AngularFirestoreDocument<any>;
  u: Observable<any>;

  check: AngularFirestoreDocument<any>;
  c: Observable<any>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private modal: ModalController, private fcm: FCM, private fs: AngularFirestore, private alt:AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if(window.localStorage.getItem('token') == null){
        this.triggerToken()
      }else{
        console.log('dah ada');
      }

    });
    
    this.team_name = window.localStorage.getItem('team_name');
  }

  loginPage(){
    this.nav.push(LoginPage)
  }

  triggerToken(){
    this.fcm.getToken().then((token)=>{
      this.token = token;
    }).then(()=>{
      this.user = this.fs.collection('token').doc(this.token);
      this.u = this.user.valueChanges();

      this.u.subscribe(u => {
        if(u == null){
          this.fs.collection('token').doc(this.token).set({
            email: ''
          }).then(() => {
            this.modal.create(NewsletterPage, null, { cssClass: 'inset-modal' }).present();
            window.localStorage.setItem('token', this.token)
          })
        }else{
          return 0;
        }
      })
    })
  }

  // presentAlert() {
  //   let alert = this.alt.create({
  //     title: 'Low battery',
  //     subTitle: this.token,
  //     buttons: ['Dismiss']
  //   });
  //   alert.present();
  // }
}

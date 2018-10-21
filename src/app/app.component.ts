import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, ModalController, AlertController, MenuController, App} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { NewsletterPage } from '../pages/newsletter/newsletter';

import { FCM } from '@ionic-native/fcm';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { GalleryPage } from '../pages/gallery/gallery';
import { HomePage } from '../pages/home/home';
import { NbaPage } from '../pages/nba/nba';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('mycontent') nav: NavController;
  rootPage: any = TabsPage;
  team_name: any;
  token;

  user: AngularFirestoreCollection<any>;
  u: Observable<any>;

  check: AngularFirestoreDocument<any>;
  c: Observable<any>;

  z:any;

  showSubmenu: boolean = false;
  showSubSubmenu : Array<Boolean> = [];





  tournament: AngularFirestoreCollection<any>;
  tour$ : Observable<any>;

  zone$ : Observable<any>;

  constructor(public app: App,public menu: MenuController,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private modal: ModalController, private fcm: FCM, private fs: AngularFirestore, private alt: AlertController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      if (window.localStorage.getItem('token') == null) {
        this.triggerToken()
      } else {
        console.log('dah ada');
      }

      this.zone$ = this.fs.collection('zone').valueChanges();
      this.zone$.subscribe();

      // this.showSubSubmenu[1] = false;

      this.tournament = this.fs.collection('tournaments');
      this.tour$ = this.tournament.snapshotChanges().map(x => {
        return x.map(y => {
          const data = y.payload.doc.data();
          const key = y.payload.doc.id;

          let a = this.fs.collection('tournaments').doc(key).collection('zone').snapshotChanges().map(z => {
            return z.map(w => {
              const key = w.payload.doc.id;
              const data = w.payload.doc.data();

              return {key, data}
            })
          });

          return {data,key,a}
        })
      })

      this.tour$.subscribe(x => {
        x.forEach(y => {
          this.showSubSubmenu.push(false)
        })

      });

      window.localStorage.setItem('zone', 'Kebangsaan');

    });

    this.team_name = window.localStorage.getItem('team_name');
  }

  ionViewDidEnter(){}

  loginPage() {
    this.nav.push(LoginPage).then(()=>{
      this.menu.close();
    })
  }

  galleryPage() {
    this.nav.setRoot(GalleryPage).then(()=>{
      this.menu.close();
    })
  }

  nbaPage() {
    this.nav.setRoot(NbaPage).then(()=>{
      this.menu.close();
    })
  }

  zone(zoned){
    window.localStorage.setItem('zone', zoned);
    this.nav.setRoot(TabsPage).then(()=>{
      this.menu.close();
    })
  }

  triggerToken() {
    this.fcm.getToken().then((token) => {
      this.fs.collection('device').add({
        token: token,
        email: ''
      }).then((ref) => {
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('uid', ref.id);
        this.modal.create(NewsletterPage, null, { cssClass: 'inset-modal' }).present();
      })
    })
  }

  home(){
    this.nav.setRoot(HomePage).then(() => {
      this.menu.close();
    })
  }

  

  menuItemHandler(): void {
    this.showSubmenu = !this.showSubmenu;
  }

  menuInsideItemHandler(i): void{
    this.showSubSubmenu[i] = !this.showSubSubmenu[i]
  }
}

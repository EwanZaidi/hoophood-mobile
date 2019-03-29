import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, ModalController, AlertController, MenuController, App } from 'ionic-angular';
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
import { StorageProvider } from '../providers/storage/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { ManageTeamPage } from '../pages/manage-team/manage-team';
import { AuthService } from '../providers/auth.service';


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

  z: any;

  showSubmenu: boolean = false;
  showSubSubmenu: Array<Boolean> = [];
  team_id: string;

  tournament: AngularFirestoreCollection<any>;
  tour$: Observable<any>;

  zone$: Observable<any>;

  isLoggedIn : Observable<boolean>;

  constructor(public app: App, public menu: MenuController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private modal: ModalController, private fcm: FCM, private fs: AngularFirestore, private alt: AlertController, private storage: StorageProvider, private afAuth: AngularFireAuth, public authService : AuthService) {
    platform.ready().then(() => {

      this.isLoggedIn = this.authService.isLoggedIn();
     
      this.team_id = window.localStorage.getItem('team_id');
      this.team_name = window.localStorage.getItem('team_name');

      this.tournament = this.fs.collection('tournaments');
      this.tour$ = this.tournament.snapshotChanges().map(x => {
        return x.map(y => {
          const data = y.payload.doc.data();
          const key = y.payload.doc.id;

          return { data, key }
        })
      })
      
      this.nav.setRoot(HomePage);

      statusBar.styleDefault();
      splashScreen.hide();

    });

  }

  ionViewDidEnter() { }

  loginPage() {
    this.nav.push(LoginPage).then(() => {
      this.menu.close();
    })
  }

  galleryPage() {
    this.nav.setRoot(GalleryPage).then(() => {
      this.menu.close();
    })
  }

  manage() {
    this.nav.setRoot(ManageTeamPage).then(() => {
      this.menu.close();
    })
  }

  nbaPage() {
    this.nav.setRoot(NbaPage).then(() => {
      this.menu.close();
    })
  }

  zone(zoned) {
    window.localStorage.setItem('zone', zoned);
    this.nav.setRoot(TabsPage).then(() => {
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

  home() {
    this.nav.setRoot(HomePage).then(() => {
      this.menu.close();
    })
  }



  menuItemHandler(): void {
    this.showSubmenu = !this.showSubmenu;
  }

  menuInsideItemHandler(i): void {
    this.showSubSubmenu[i] = !this.showSubSubmenu[i]
  }

  sel_tournament(key) {
    this.storage.tournament_key(key);
    this.nav.setRoot(TabsPage).then(() => {
      this.menu.close();
    })
  }

  logout() {
  
    this.nav.setRoot(LoginPage).then(() => {
      this.menu.close();
      this.authService.logout();
    })
  }

  login() {
    this.nav.push(LoginPage).then(() => {
      this.menu.close();
    });
  }
}

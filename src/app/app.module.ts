import { GameDetailsPage } from './../pages/game-details/game-details';
import { TeamDetailsPage } from './../pages/team-details/team-details';
import { StatisticsPage} from './../pages/statistics/statistics';
import { GamesPage } from './../pages/games/games';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FormsModule } from '@angular/forms';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { TeamPage } from './../pages/team/team';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StandingPage } from '../pages/standing/standing';

import { AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireModule} from 'angularfire2';
import { FIREBASE_CONFIG } from './firebase.credentials';

import { SuperTabsModule } from 'ionic2-super-tabs';
import { BracketPage } from '../pages/bracket/bracket';
import { GroupDetailsPage } from '../pages/group-details/group-details';
import { LoginPage } from '../pages/login/login';

// import { Camera} from '@ionic-native/camera';
// import { CameraPreview } from '@ionic-native/camera-preview';

import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { NewsletterPage } from '../pages/newsletter/newsletter';

import { FCM } from '@ionic-native/fcm';
import { GalleryPage } from '../pages/gallery/gallery';
import { NbaPage } from '../pages/nba/nba';

import { Braintree } from '@ionic-native/braintree';

// import { SideMenuContentComponent } from '../shared/side-menu-content/side-menu-content.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    TeamPage,
    GamesPage,
    StandingPage,
    StatisticsPage,
    TeamDetailsPage,
    GameDetailsPage,
    BracketPage,
    GroupDetailsPage,
    LoginPage,
    StatisticsPage,
    NewsletterPage,
    GalleryPage,
    NbaPage,
    // SideMenuContentComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    SuperTabsModule.forRoot(),
    FormsModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    TeamPage,
    GamesPage,
    StandingPage,
    StatisticsPage,
    TeamDetailsPage,
    GameDetailsPage,
    BracketPage,
    GroupDetailsPage,
    LoginPage,
    StatisticsPage,
    NewsletterPage,
    GalleryPage,
    NbaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // Camera,
    // CameraPreview,
    ScreenOrientation,
    FCM,
    Braintree
  ]
})
export class AppModule {}

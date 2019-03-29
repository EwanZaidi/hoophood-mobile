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

import { FCM } from '@ionic-native/fcm';
import { StorageProvider } from '../providers/storage/storage';
import { BracketPageModule } from '../pages/bracket/bracket.module';
import { GalleryPageModule } from '../pages/gallery/gallery.module';
import { GroupDetailsPageModule } from '../pages/group-details/group-details.module';
import { LoginPageModule } from '../pages/login/login.module';
import { ManageTeamPageModule } from '../pages/manage-team/manage-team.module';
import { AddPlayerPageModule } from '../pages/add-player/add-player.module';
import { EditPlayerPageModule } from '../pages/edit-player/edit-player.module';
import { AuthService } from '../providers/auth.service';

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
    StatisticsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    SuperTabsModule.forRoot(),
    FormsModule,
    AngularFireAuthModule,
    BracketPageModule,
    GalleryPageModule,
    GroupDetailsPageModule,
    LoginPageModule,
    ManageTeamPageModule,
    AddPlayerPageModule,
    EditPlayerPageModule
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
    StatisticsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FCM,
    StorageProvider,
    AuthService
  ]
})
export class AppModule {}

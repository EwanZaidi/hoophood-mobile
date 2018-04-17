import { Component } from '@angular/core';

import { StatisticsPage } from '../statistics/statistics';
import { StandingPage } from '../standing/standing';
import { GamesPage } from '../games/games';
import { TeamPage } from '../team/team';
import { HomePage } from '../home/home';
import { BracketPage } from '../bracket/bracket';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = GamesPage;
  tab3Root = StandingPage;
  tab4Root = BracketPage;
  tab5Root = TeamPage;

  constructor(private auth: AngularFireAuth, private fs: AngularFirestore) {
    this.auth.authState.subscribe(x => {
      let uid = x.uid;
      let a : AngularFirestoreDocument<any> = this.fs.collection('users').doc(uid);
      let as : Observable<any> = a.valueChanges();

      as.subscribe(x => console.log(x))
    });
  }
}

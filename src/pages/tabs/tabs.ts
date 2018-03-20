import { Component } from '@angular/core';

import { StatisticsPage } from '../statistics/statistics';
import { StandingPage } from '../standing/standing';
import { GamesPage } from '../games/games';
import { TeamPage } from '../team/team';
import { HomePage } from '../home/home';
import { BracketPage } from '../bracket/bracket';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = GamesPage;
  tab3Root = StandingPage;
  tab4Root = BracketPage;
  tab5Root = TeamPage;

  constructor() {

  }
}

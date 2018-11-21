import { myMatch, MatchData } from './match.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { GameDetailsPage } from '../game-details/game-details';
import 'rxjs/add/operator/take';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the BracketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bracket',
  templateUrl: 'bracket.html',
})
export class BracketPage {

  category = 'Lelaki';
  matchL: Observable<any>;
  matchP: Observable<any>;
  MatchLelaki: Array<myMatch> = new Array<myMatch>(7);
  MatchPerempuan: Array<myMatch> = new Array<myMatch>(7);
  zone : any;
  nozone: Boolean;
  nodata: Boolean;
  now_zone;

  a: Boolean[] = new Array();
  b: Boolean[] = new Array();

  constructor(public navCtrl: NavController, private storage: StorageProvider, public navParams: NavParams, private fs: AngularFirestore, platform: Platform) {

    platform.ready().then(()=>{
      this.getItem();
    })

  }

  getItem(){
    this.nozone = false;
    this.nodata = true;

    let key = this.storage.get_tournament_key();
    
    let a = this.storage.get_tournament_name();
    a.subscribe(x => {
      this.now_zone = `${x.tournament_name.toUpperCase()} - BRACKET`;
    })

    for (let i = 0; i < this.MatchLelaki.length; i++) {
      this.MatchLelaki[i] = new myMatch();
      this.MatchLelaki[i].id = '';
      this.MatchLelaki[i].data = new MatchData();
    }

    for (let j = 0; j < this.MatchPerempuan.length; j++) {
      this.MatchPerempuan[j] = new myMatch();
      this.MatchPerempuan[j].id = '';
      this.MatchPerempuan[j].data = new MatchData();
    }

    this.nozone = true;
    this.nodata = false;

    for (let i = 0; i < this.MatchLelaki.length; i++) {
      this.MatchLelaki[i] = new myMatch();
      this.MatchLelaki[i].id = '';
      this.MatchLelaki[i].data = new MatchData();
    }

    for (let j = 0; j < this.MatchPerempuan.length; j++) {
      this.MatchPerempuan[j] = new myMatch();
      this.MatchPerempuan[j].id = '';
      this.MatchPerempuan[j].data = new MatchData();
    }

    let matches: AngularFirestoreCollection<any> = this.fs.collection('matches', ref => ref.where('tournament_id', '==', key).where('category', '==', 1));
    this.matchL = matches.snapshotChanges().map(mt => {

      let matches = mt.filter(f => f.payload.doc.data().description !== "Group")
      let newMatches: Array<myMatch> = new Array<myMatch>(7);

      if (matches.filter(f => f.payload.doc.data().description === "Quarterfinal 1").length == 0) {
        newMatches[0] = new myMatch();
        newMatches[0].id = '';
        newMatches[0].data = new MatchData();
      } else {
        newMatches[0] = new myMatch();
        newMatches[0].id = matches.filter(f => f.payload.doc.data().description === "Quarterfinal 1")[0].payload.doc.id || '';
        newMatches[0].data = matches.filter(f => f.payload.doc.data().description === "Quarterfinal 1")[0].payload.doc.data() || new MatchData();
        let setTime = newMatches[0].data.datetime;
        let date = new Date();
        setTime.setMinutes(setTime.getMinutes() + 30);
        if (date > setTime) {
          this.a[0] = true;
        } else {
          this.a[0] = false;
        }
      }

      if (matches.filter(f => f.payload.doc.data().description === "Quarterfinal 2").length == 0) {
        newMatches[1] = new myMatch();
        newMatches[1].id = '';
        newMatches[1].data = new MatchData();
      } else {
        newMatches[1] = new myMatch();
        newMatches[1].id = matches.filter(f => f.payload.doc.data().description === "Quarterfinal 2")[0].payload.doc.id || '';
        newMatches[1].data = matches.filter(f => f.payload.doc.data().description === "Quarterfinal 2")[0].payload.doc.data() || new MatchData();
        let setTime = newMatches[1].data.datetime;
        let date = new Date();
        setTime.setMinutes(setTime.getMinutes() + 30);
        if (date > setTime) {
          this.a[1] = true;
        } else {
          this.a[1] = false;
        }
      }

      if (matches.filter(f => f.payload.doc.data().description === "Quarterfinal 3").length == 0) {
        newMatches[2] = new myMatch();
        newMatches[2].id = '';
        newMatches[2].data = new MatchData();
      } else {
        newMatches[2] = new myMatch();
        newMatches[2].id = matches.filter(f => f.payload.doc.data().description === "Quarterfinal 3")[0].payload.doc.id || '';
        newMatches[2].data = matches.filter(f => f.payload.doc.data().description === "Quarterfinal 3")[0].payload.doc.data() || new MatchData();
        let setTime = newMatches[2].data.datetime;
        let date = new Date();
        setTime.setMinutes(setTime.getMinutes() + 30);
        if (date > setTime) {
          this.a[2] = true;
        } else {
          this.a[2] = false;
        }
      }

      if (matches.filter(f => f.payload.doc.data().description === "Quarterfinal 4").length == 0) {
        newMatches[3] = new myMatch();
        newMatches[3].id = '';
        newMatches[3].data = new MatchData();
      } else {
        newMatches[3] = new myMatch();
        newMatches[3].id = matches.filter(f => f.payload.doc.data().description === "Quarterfinal 4")[0].payload.doc.id || '';
        newMatches[3].data = matches.filter(f => f.payload.doc.data().description === "Quarterfinal 4")[0].payload.doc.data() || new MatchData();
        let setTime = newMatches[3].data.datetime;
        let date = new Date();
        setTime.setMinutes(setTime.getMinutes() + 30);
        if (date > setTime) {
          this.a[3] = true;
        } else {
          this.a[3] = false;
        }
      }

      if (matches.filter(f => f.payload.doc.data().description === "Semifinal 1").length == 0) {
        newMatches[4] = new myMatch();
        newMatches[4].id = '';
        newMatches[4].data = new MatchData();
      } else {
        newMatches[4] = new myMatch();
        newMatches[4].id = matches.filter(f => f.payload.doc.data().description === "Semifinal 1")[0].payload.doc.id || '';
        newMatches[4].data = matches.filter(f => f.payload.doc.data().description === "Semifinal 1")[0].payload.doc.data() || new MatchData();
        let setTime = newMatches[4].data.datetime;
        let date = new Date();
        setTime.setMinutes(setTime.getMinutes() + 30);
        if (date > setTime) {
          this.a[4] = true;
        } else {
          this.a[4] = false;
        }
      }

      if (matches.filter(f => f.payload.doc.data().description === "Semifinal 2").length == 0) {
        newMatches[5] = new myMatch();
        newMatches[5].id = '';
        newMatches[5].data = new MatchData();
      } else {
        newMatches[5] = new myMatch();
        newMatches[5].id = matches.filter(f => f.payload.doc.data().description === "Semifinal 2")[0].payload.doc.id || '';
        newMatches[5].data = matches.filter(f => f.payload.doc.data().description === "Semifinal 2")[0].payload.doc.data() || new MatchData();
        let setTime = newMatches[5].data.datetime;
        let date = new Date();
        setTime.setMinutes(setTime.getMinutes() + 30);
        if (date > setTime) {
          this.a[5] = true;
        } else {
          this.a[5] = false;
        }
      }

      if (matches.filter(f => f.payload.doc.data().description === "Final").length == 0) {
        newMatches[6] = new myMatch();
        newMatches[6].id = '';
        newMatches[6].data = new MatchData();
      } else {
        newMatches[6] = new myMatch();
        newMatches[6].id = matches.filter(f => f.payload.doc.data().description === "Final")[0].payload.doc.id || '';
        newMatches[6].data = matches.filter(f => f.payload.doc.data().description === "Final")[0].payload.doc.data() || new MatchData();
        let setTime = newMatches[6].data.datetime;
        let date = new Date();
        setTime.setMinutes(setTime.getMinutes() + 30);
        if (date > setTime) {
          this.a[6] = true;
        } else {
          this.a[6] = false;
        }
      }

      this.MatchLelaki = newMatches.slice(0);
      this.nodata = false;
      return newMatches;

    })

    this.matchL.subscribe();

    let matchesP: AngularFirestoreCollection<any> = this.fs.collection('matches', ref => ref.where('tournament_id', '==', key).where('category', '==', 2))
    this.matchP = matchesP.snapshotChanges().map(mt => {

      let matches = mt.filter(f => f.payload.doc.data().description !== "Group")
      let newMatches: Array<myMatch> = new Array<myMatch>(7);

      if (matches.filter(f => f.payload.doc.data().description === "Quarterfinal 1").length == 0) {
        newMatches[0] = new myMatch();
        newMatches[0].id = '';
        newMatches[0].data = new MatchData();
      } else {
        newMatches[0] = new myMatch();
        newMatches[0].id = matches.filter(f => f.payload.doc.data().description === "Quarterfinal 1")[0].payload.doc.id || '';
        newMatches[0].data = matches.filter(f => f.payload.doc.data().description === "Quarterfinal 1")[0].payload.doc.data() || new MatchData();
        let setTime = newMatches[0].data.datetime;
        let date = new Date();
        setTime.setMinutes(setTime.getMinutes() + 30);
        if (date > setTime) {
          this.b[0] = true;
        } else {
          this.b[0] = false;
        }
      }

      if (matches.filter(f => f.payload.doc.data().description === "Quarterfinal 2").length == 0) {
        newMatches[1] = new myMatch();
        newMatches[1].id = '';
        newMatches[1].data = new MatchData();
      } else {
        newMatches[1] = new myMatch();
        newMatches[1].id = matches.filter(f => f.payload.doc.data().description === "Quarterfinal 2")[0].payload.doc.id || '';
        newMatches[1].data = matches.filter(f => f.payload.doc.data().description === "Quarterfinal 2")[0].payload.doc.data() || new MatchData();
        let setTime = newMatches[1].data.datetime;
        let date = new Date();
        setTime.setMinutes(setTime.getMinutes() + 30);
        if (date > setTime) {
          this.b[1] = true;
        } else {
          this.b[1] = false;
        }
      }

      if (matches.filter(f => f.payload.doc.data().description === "Quarterfinal 3").length == 0) {
        newMatches[2] = new myMatch();
        newMatches[2].id = '';
        newMatches[2].data = new MatchData();
      } else {
        newMatches[2] = new myMatch();
        newMatches[2].id = matches.filter(f => f.payload.doc.data().description === "Quarterfinal 3")[0].payload.doc.id || '';
        newMatches[2].data = matches.filter(f => f.payload.doc.data().description === "Quarterfinal 3")[0].payload.doc.data() || new MatchData();
        let setTime = newMatches[2].data.datetime;
        let date = new Date();
        setTime.setMinutes(setTime.getMinutes() + 30);
        if (date > setTime) {
          this.b[2] = true;
        } else {
          this.b[2] = false;
        }
      }

      if (matches.filter(f => f.payload.doc.data().description === "Quarterfinal 4").length == 0) {
        newMatches[3] = new myMatch();
        newMatches[3].id = '';
        newMatches[3].data = new MatchData();
      } else {
        newMatches[3] = new myMatch();
        newMatches[3].id = matches.filter(f => f.payload.doc.data().description === "Quarterfinal 4")[0].payload.doc.id || '';
        newMatches[3].data = matches.filter(f => f.payload.doc.data().description === "Quarterfinal 4")[0].payload.doc.data() || new MatchData();
        let setTime = newMatches[3].data.datetime;
        let date = new Date();
        setTime.setMinutes(setTime.getMinutes() + 30);
        if (date > setTime) {
          this.b[3] = true;
        } else {
          this.b[3] = false;
        }
      }

      if (matches.filter(f => f.payload.doc.data().description === "Semifinal 1").length == 0) {
        newMatches[4] = new myMatch();
        newMatches[4].id = '';
        newMatches[4].data = new MatchData();
      } else {
        newMatches[4] = new myMatch();
        newMatches[4].id = matches.filter(f => f.payload.doc.data().description === "Semifinal 1")[0].payload.doc.id || '';
        newMatches[4].data = matches.filter(f => f.payload.doc.data().description === "Semifinal 1")[0].payload.doc.data() || new MatchData();
        let setTime = newMatches[4].data.datetime;
        let date = new Date();
        setTime.setMinutes(setTime.getMinutes() + 30);
        if (date > setTime) {
          this.b[4] = true;
        } else {
          this.b[4] = false;
        }
      }

      if (matches.filter(f => f.payload.doc.data().description === "Semifinal 2").length == 0) {
        newMatches[5] = new myMatch();
        newMatches[5].id = '';
        newMatches[5].data = new MatchData();
      } else {
        newMatches[5] = new myMatch();
        newMatches[5].id = matches.filter(f => f.payload.doc.data().description === "Semifinal 2")[0].payload.doc.id || '';
        newMatches[5].data = matches.filter(f => f.payload.doc.data().description === "Semifinal 2")[0].payload.doc.data() || new MatchData();
        let setTime = newMatches[5].data.datetime;
        let date = new Date();
        setTime.setMinutes(setTime.getMinutes() + 30);
        if (date > setTime) {
          this.b[5] = true;
        } else {
          this.b[5] = false;
        }
      }

      if (matches.filter(f => f.payload.doc.data().description === "Final").length == 0) {
        newMatches[6] = new myMatch();
        newMatches[6].id = '';
        newMatches[6].data = new MatchData();
      } else {
        newMatches[6] = new myMatch();
        newMatches[6].id = matches.filter(f => f.payload.doc.data().description === "Final")[0].payload.doc.id || '';
        newMatches[6].data = matches.filter(f => f.payload.doc.data().description === "Final")[0].payload.doc.data() || new MatchData();
        let setTime = newMatches[6].data.datetime;
        let date = new Date();
        setTime.setMinutes(setTime.getMinutes() + 30);
        if (date > setTime) {
          this.b[6] = true;
        } else {
          this.b[6] = false;
        }
      }

      this.MatchPerempuan = newMatches.slice(0);
      this.nodata = false;
      return newMatches;

    })

    this.matchP.subscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BracketPage');
  }

  zonechanged(event) {

  }

  details(data) {
    this.navCtrl.push(GameDetailsPage, { id: null, data: data });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}

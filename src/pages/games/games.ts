import { GameDetailsPage } from './../game-details/game-details';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
/**
 * Generated class for the GamesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-games',
  templateUrl: 'games.html',
})
export class GamesPage {

  matches : AngularFirestoreCollection<any>;
  match : Observable<any>;

  show : Boolean = false;

  zone = [{id : 'Central'}, {id : 'South'}, {id : 'North'}, {id : 'East'}];

  constructor(public navCtrl: NavController, public navParams: NavParams, private fs : AngularFirestore) {
  }

  ionViewDidLoad() {
    
  }

  navigate(details){
    this.navCtrl.push(GameDetailsPage, {id: details.id, data: details.data});
  }

  zonechanged(event){
    this.matches = this.fs.collection('matches', ref => ref.orderBy('match_no').where('zone', '==', event));
    this.match = this.matches.snapshotChanges().map(m => {
      return m.map(x => {
        const data = x.payload.doc.data();
        const id = x.payload.doc.id;

        console.log(data.team1_name);
        

        // let pic_home = this.fs.collection('teams', ref => {return ref.where('team1_name','==', data.team_name)}).snapshotChanges().take(1).map(x=> {
        //   return x.map(y => {
        //     const data = y.payload.doc.data();
        //     const id = y.payload.doc.id;

        //     return {data,id};
        //   })
        // })

        // let pic_away = this.fs.collection('teams', ref => {return ref.where('team2_name','==', data.team_name)}).snapshotChanges().take(1).map(x=> {
        //   return x.map(y => {
        //     const data = y.payload.doc.data();
        //     const id = y.payload.doc.id;

        //     return {data,id};
        //   })
        // })

        return {data,id};
        // return {data,id,pic_home, pic_away};
      })
    })

    this.show = true;
  }

}

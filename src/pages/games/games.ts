import { GameDetailsPage } from './../game-details/game-details';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
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
  nozone : Boolean = true;

  a : Boolean[] = new Array();



  zone = [{id : 'Central'}, {id : 'South'}, {id : 'North'}, {id : 'East'}];

  constructor(public navCtrl: NavController, public navParams: NavParams, private fs : AngularFirestore, public load: LoadingController) {
  }

  ionViewDidLoad() {
    
  }

  navigate(details){
    let loading = this.load.create({
      spinner: 'bubbles',
    });
  
    loading.present();
  
    setTimeout(() => {
      this.navCtrl.push(GameDetailsPage, {id: details.id, data: details.data});
    }, 2000);
  
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  zonechanged(event){
    const date = new Date();

    this.nozone = false;
    this.matches = this.fs.collection('matches', ref => ref.orderBy('match_no').where('zone', '==', event));
    this.match = this.matches.snapshotChanges().map(m => {
      m.forEach(mt => {
        let i = mt.payload.newIndex;
        let a = mt.payload.doc.data();
        let gameDate = a.datetime;
        gameDate.setMinutes(gameDate.getMinutes() + 30);
        if(date > gameDate ){
          this.a[i] = true;
        }else{
          this.a[i] = false;
        }
      })
      return m.map(x => {
        const data = x.payload.doc.data();
        const id = x.payload.doc.id;
        return {data,id};
      })
    })
  }

}

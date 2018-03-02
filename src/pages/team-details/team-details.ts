import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TeamDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-team-details',
  templateUrl: 'team-details.html',
})
export class TeamDetailsPage {

  data: any;
  id: any;
  teams: AngularFirestoreCollection<any>
  team: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fs: AngularFirestore) {
  }

  ionViewDidLoad() {
    this.data = this.navParams.get('data');
    this.id = this.navParams.get('id');
    
    this.teams = this.fs.collection('teams/'+this.id+'/players');
    this.team = this.teams.valueChanges();
  }



}

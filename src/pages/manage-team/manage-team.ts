import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AddPlayerPage } from '../add-player/add-player';
import { EditPlayerPage } from '../edit-player/edit-player';

/**
 * Generated class for the ManageTeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-team',
  templateUrl: 'manage-team.html',
})
export class ManageTeamPage {

  id;
  team: Observable<any>;
  teams: Observable<any>;

  edit = false;



  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: AngularFirestore, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.id = window.localStorage.getItem('team_id');
    console.log(this.id);
    let team = this.afs.collection(`teams`).doc(`${this.id}`);
    this.team = team.snapshotChanges().map(x => {
      const data = x.payload.data();
      const key = x.payload.id;

      return {data,key}
    })

    let teams = this.afs.collection('teams/'+this.id+'/players');
    this.teams = teams.snapshotChanges().map(x => {
      return x.map(y =>{
        const key = y.payload.doc.id;
        const data = y.payload.doc.data();

        return {key, data}
      })
    });
  }

  onEdit(){
    this.edit = true;
  }

  addPlayer() {
    let addPlayerModal = this.modalCtrl.create(AddPlayerPage);
    addPlayerModal.present();
  }

  editPlayer(key){
    let editPlayerModal = this.modalCtrl.create(EditPlayerPage,  {key : key});
    editPlayerModal.present();
  }

}

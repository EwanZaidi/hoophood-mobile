import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the GroupDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-details',
  templateUrl: 'group-details.html',
})
export class GroupDetailsPage {
  
  data: any;
  id: any;

  details: AngularFirestoreCollection<any>;
  detail: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: AngularFirestore) {
  }

  ionViewDidLoad() {
    this.data = this.navParams.get('data');
    this.id = this.navParams.get('id');

    this.details = this.afs.collection('groups/'+this.id+'/team_list/', ref=> ref.orderBy('pos'));
    this.detail = this.details.snapshotChanges().map(f => {
      return f.map(g => {
        const id = g.payload.doc.id;
        const data = g.payload.doc.data();

        let no = data.pos.replace(/\D/g,'');
        console.log(no);
        

        let det = this.afs.collection('groups/'+this.id+'/team_list/'+id+'/game_details').snapshotChanges().map(f=> {
          // f.map(g => {
          //   const id = g.payload.doc.id;
          //   const data = g.payload.doc.data();
          //   return result;
          // })

          let result:any = new Array<any>()
          
          
          for (let i=0; i<f.length; i++) {
            // if(no==(i+1)) result.push({id:id,score:''});
            result.push({id:f[i].payload.doc.id,score:f[i].payload.doc.data().score})
          }
           
          return result;

        })
        // let showScore = function(){
        //   return (det[id]?(det[id].data?(det[id].data.score?det[id].data.score:''):''):'');      
        // }
        return {id, data, det}
      })
    })
  }

  showScore = function(id,det){
    // console.log(id,det);
    // console.log(det);
    
    // det.forEach(x=>{
    //   console.log(x);
    // })
    // return (det[id]?(det[id].data?(det[id].data.score?det[id].data.score:''):''):'');      
    return det.score;
  }

}

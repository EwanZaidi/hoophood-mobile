import { myMatch,MatchData } from './match.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

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

  category= 'Lelaki';
  matchL : Observable<any>;
  matchP : Observable<any>;
  MatchLelaki:Array<myMatch> = new Array<myMatch>(7);
  MatchPerempuan:Array<myMatch> = new Array<myMatch>(7);
  zone='';
  nozone : Boolean;
  nodata: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fs:AngularFirestore) {

    this.nozone = false;
    this.nodata = false;
    
    for(let i=0;i<this.MatchLelaki.length;i++){
      this.MatchLelaki[i] = new myMatch();
      this.MatchLelaki[i].id = '';
      this.MatchLelaki[i].data = new MatchData();
    }
  
    for(let j=0;j<this.MatchPerempuan.length;j++){
      this.MatchPerempuan[j] = new myMatch();
      this.MatchPerempuan[j].id = '';
      this.MatchPerempuan[j].data = new MatchData();
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BracketPage');
  }

  zonechanged(event){
    this.nozone = true;

    for(let i=0;i<this.MatchLelaki.length;i++){
      this.MatchLelaki[i] = new myMatch();
      this.MatchLelaki[i].id = '';
      this.MatchLelaki[i].data = new MatchData();
    }
  
    for(let j=0;j<this.MatchPerempuan.length;j++){
      this.MatchPerempuan[j] = new myMatch();
      this.MatchPerempuan[j].id = '';
      this.MatchPerempuan[j].data = new MatchData();
    }


    
    let matches : AngularFirestoreCollection<any> = this.fs.collection('matches', ref=> ref.where('zone', '==', event).where('category', '==', 'Lelaki'));
    this.matchL = matches.snapshotChanges().map(mt => {
    
      try {
       
      let matches = mt.filter(f=>f.payload.doc.data().description!=="Group")
      let newMatches:Array<myMatch> = new Array<myMatch>(7);

      newMatches[0] = new myMatch();
      newMatches[0].id = matches.filter(f=>f.payload.doc.data().description==="Quarterfinal 1")[0].payload.doc.id||'';
      newMatches[0].data = matches.filter(f=>f.payload.doc.data().description==="Quarterfinal 1")[0].payload.doc.data()||new MatchData();

      newMatches[1] = new myMatch();
      newMatches[1].id = matches.filter(f=>f.payload.doc.data().description==="Quarterfinal 2")[0].payload.doc.id||'';
      newMatches[1].data = matches.filter(f=>f.payload.doc.data().description==="Quarterfinal 2")[0].payload.doc.data()||new MatchData();

      newMatches[2] = new myMatch();
      newMatches[2].id = matches.filter(f=>f.payload.doc.data().description==="Quarterfinal 3")[0].payload.doc.id||'';
      newMatches[2].data = matches.filter(f=>f.payload.doc.data().description==="Quarterfinal 3")[0].payload.doc.data()||new MatchData();

      newMatches[3] = new myMatch();
      newMatches[3].id = matches.filter(f=>f.payload.doc.data().description==="Quarterfinal 4")[0].payload.doc.id||'';
      newMatches[3].data = matches.filter(f=>f.payload.doc.data().description==="Quarterfinal 4")[0].payload.doc.data()||new MatchData();

      newMatches[4] = new myMatch();
      newMatches[4].id = matches.filter(f=>f.payload.doc.data().description==="Semifinal 1")[0].payload.doc.id||'';
      newMatches[4].data = matches.filter(f=>f.payload.doc.data().description==="Semifinal 1")[0].payload.doc.data()||new MatchData();

      newMatches[5] = new myMatch();
      newMatches[5].id = matches.filter(f=>f.payload.doc.data().description==="Semifinal 2")[0].payload.doc.id||'';
      newMatches[5].data = matches.filter(f=>f.payload.doc.data().description==="Semifinal 2")[0].payload.doc.data()||new MatchData();

      newMatches[6] = new myMatch();
      newMatches[6].id = matches.filter(f=>f.payload.doc.data().description==="Final")[0].payload.doc.id||'';
      newMatches[6].data = matches.filter(f=>f.payload.doc.data().description==="Final")[0].payload.doc.data()||new MatchData();

      this.MatchLelaki = newMatches.slice(0);

      // console.log(this.MatchLelaki);
      this.nodata = false;
      return newMatches;

      } catch (error) {
        // this.nodata = true;
        let newMatches:Array<myMatch> = new Array<myMatch>(7);
        newMatches[0] = new myMatch();
        newMatches[0].id = '';
        newMatches[0].data = new MatchData();
  
        newMatches[1] = new myMatch();
        newMatches[1].id = '';
        newMatches[1].data = new MatchData();

        newMatches[2] = new myMatch();
        newMatches[2].id = '';
        newMatches[2].data = new MatchData();
  
        newMatches[3] = new myMatch();
        newMatches[3].id = '';
        newMatches[3].data = new MatchData();
  
        newMatches[4] = new myMatch();
        newMatches[4].id = '';
        newMatches[4].data = new MatchData();
  
        newMatches[5] = new myMatch();
        newMatches[5].id = '';
        newMatches[5].data = new MatchData();
  
        newMatches[6] = new myMatch();
        newMatches[6].id = '';
        newMatches[6].data = new MatchData();
        this.MatchLelaki = newMatches.slice(0);
        return newMatches;
      }

    })

    this.matchL.subscribe();
   
    let matchesP : AngularFirestoreCollection<any> = this.fs.collection('matches', ref=> ref.where('zone', '==', event).where('category', '==', 'Perempuan'))
    this.matchP = matchesP.snapshotChanges().map(mt => {

      try {

        let matches = mt.filter(f=>f.payload.doc.data().description!=="Group")
        let newMatches:Array<myMatch> = new Array<myMatch>(7);
  
        newMatches[0] = new myMatch();
        newMatches[0].id = matches.filter(f=>f.payload.doc.data().description==="Quarterfinal 1")[0].payload.doc.id||'';
        newMatches[0].data = matches.filter(f=>f.payload.doc.data().description==="Quarterfinal 1")[0].payload.doc.data()||new MatchData();
  
        newMatches[1] = new myMatch();
        newMatches[1].id = matches.filter(f=>f.payload.doc.data().description==="Quarterfinal 2")[0].payload.doc.id||'';
        newMatches[1].data = matches.filter(f=>f.payload.doc.data().description==="Quarterfinal 2")[0].payload.doc.data()||new MatchData();
  
        newMatches[2] = new myMatch();
        newMatches[2].id = matches.filter(f=>f.payload.doc.data().description==="Quarterfinal 3")[0].payload.doc.id||'';
        newMatches[2].data = matches.filter(f=>f.payload.doc.data().description==="Quarterfinal 3")[0].payload.doc.data()||new MatchData();
  
        newMatches[3] = new myMatch();
        newMatches[3].id = matches.filter(f=>f.payload.doc.data().description==="Quarterfinal 4")[0].payload.doc.id||'';
        newMatches[3].data = matches.filter(f=>f.payload.doc.data().description==="Quarterfinal 4")[0].payload.doc.data()||new MatchData();
  
        newMatches[4] = new myMatch();
        newMatches[4].id = matches.filter(f=>f.payload.doc.data().description==="Semifinal 1")[0].payload.doc.id||'';
        newMatches[4].data = matches.filter(f=>f.payload.doc.data().description==="Semifinal 1")[0].payload.doc.data()||new MatchData();
  
        newMatches[5] = new myMatch();
        newMatches[5].id = matches.filter(f=>f.payload.doc.data().description==="Semifinal 2")[0].payload.doc.id||'';
        newMatches[5].data = matches.filter(f=>f.payload.doc.data().description==="Semifinal 2")[0].payload.doc.data()||new MatchData();
  
        newMatches[6] = new myMatch();
        newMatches[6].id = matches.filter(f=>f.payload.doc.data().description==="Final")[0].payload.doc.id||'';
        newMatches[6].data = matches.filter(f=>f.payload.doc.data().description==="Final")[0].payload.doc.data()||new MatchData();
  
        this.MatchPerempuan = newMatches.slice(0);
        this.nodata = false;
        return newMatches;  

      } catch (error) {
        let newMatches:Array<myMatch> = new Array<myMatch>(7);
        newMatches[0] = new myMatch();
        newMatches[0].id = '';
        newMatches[0].data = new MatchData();
  
        newMatches[1] = new myMatch();
        newMatches[1].id = '';
        newMatches[1].data = new MatchData();

        newMatches[2] = new myMatch();
        newMatches[2].id = '';
        newMatches[2].data = new MatchData();
  
        newMatches[3] = new myMatch();
        newMatches[3].id = '';
        newMatches[3].data = new MatchData();
  
        newMatches[4] = new myMatch();
        newMatches[4].id = '';
        newMatches[4].data = new MatchData();
  
        newMatches[5] = new myMatch();
        newMatches[5].id = '';
        newMatches[5].data = new MatchData();
  
        newMatches[6] = new myMatch();
        newMatches[6].id = '';
        newMatches[6].data = new MatchData();
        this.MatchPerempuan = newMatches.slice(0);
        return newMatches;
      }

      
    })

    this.matchP.subscribe();
  }

}

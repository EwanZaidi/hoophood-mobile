import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

declare let FCMPlugin: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  image: String;

  z: any;

  news: Observable<any>;

  loading: boolean = true;

  constructor(public menu: MenuController,private platform: Platform, private db: AngularFireDatabase) {
    let news = this.db.list('news', ref => ref.orderByChild('created_on'));
    this.news = news.valueChanges();
  }

  ionViewDidLoad(){
    this.loading = false;
  }



  async onNotification(){
    try {
      await this.platform.ready();

      FCMPlugin.onNotification((data) => {
        console.log(data); 
      }, (error) => console.log(error));
    }
    catch (e) {
      console.log(e);
      
    }
  }
}

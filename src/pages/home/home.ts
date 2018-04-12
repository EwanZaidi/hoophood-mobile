import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

declare let FCMPlugin: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private platform: Platform) {
    this.onNotification();
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

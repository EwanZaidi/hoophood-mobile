import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  timur(){
    window.open('https://drive.google.com/drive/folders/1Xv82ny7tLhGGgJaJngcHz8arg4hlmBm4?usp=sharing', '_system')
  }

  selatan(){
    window.open('https://drive.google.com/drive/folders/1CXiHwizqZyD8aDIYqioU8kqRYS0y6MEc?usp=sharing', '_system')
  }

}

import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';


declare let FCMPlugin: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  image: String;

  z: any;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'rear',
    tapPhoto: true,
    previewDrag: true,
    toBack: false,
    alpha: 1
  };

  constructor(public menu: MenuController,private camera: Camera,private platform: Platform, private cameraPreview: CameraPreview) {
    this.onNotification();
    this.platform.ready().then(()=>{
      let idx = 0;
      window.localStorage.setItem('index', idx.toString());
      this.z = window.localStorage.getItem('zone');
    })
  }

  ionViewDidLoad(){}

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

  async takePicture(): Promise<any>{
    try{
      this.image = await this.camera.getPicture(this.options)
    }
    catch(e){
      console.log(e);
    }
  }

  takePicture2() {
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then((res)=>{
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }

  

  // tengah(){
  //   window.open('https://drive.google.com/drive/folders/1Z8Doau-q3OUYTS2iM-zhamSwLdA5nDx2?usp=sharing', '_system')
  // }

  // timur(){
  //   window.open('https://drive.google.com/drive/folders/1Xv82ny7tLhGGgJaJngcHz8arg4hlmBm4?usp=sharing', '_system')
  // }

  // selatan(){
  //   window.open('https://drive.google.com/drive/folders/1CXiHwizqZyD8aDIYqioU8kqRYS0y6MEc?usp=sharing', '_system')
  // }
}

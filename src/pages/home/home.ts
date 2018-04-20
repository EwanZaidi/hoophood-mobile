import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';


declare let FCMPlugin: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  image: String;

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

  constructor(private camera: Camera,private platform: Platform, private cameraPreview: CameraPreview) {
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
}

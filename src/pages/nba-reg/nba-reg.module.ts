import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NbaRegPage } from './nba-reg';

@NgModule({
  declarations: [
    NbaRegPage,
  ],
  imports: [
    IonicPageModule.forChild(NbaRegPage),
  ],
})
export class NbaRegPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BracketDetailPage } from './bracket-detail';

@NgModule({
  declarations: [
    BracketDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BracketDetailPage),
  ],
})
export class BracketDetailPageModule {}

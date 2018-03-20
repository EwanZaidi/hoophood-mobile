import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BracketPage } from './bracket';

@NgModule({
  declarations: [
    BracketPage,
  ],
  imports: [
    IonicPageModule.forChild(BracketPage),
  ],
})
export class BracketPageModule {}

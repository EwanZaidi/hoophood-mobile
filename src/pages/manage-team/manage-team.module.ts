import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageTeamPage } from './manage-team';

@NgModule({
  declarations: [
    ManageTeamPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageTeamPage),
  ],
})
export class ManageTeamPageModule {}

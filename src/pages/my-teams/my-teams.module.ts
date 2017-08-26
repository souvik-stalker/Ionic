import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyTeamsPage } from './my-teams';
import { TournamentsPageModule} from '../tournaments/tournaments.module';
@NgModule({
  declarations: [
    MyTeamsPage,
  ],
  imports: [
    TournamentsPageModule,
    IonicPageModule.forChild(MyTeamsPage),
  ],
  exports:[
    MyTeamsPage
  ]
})
export class MyTeamsPageModule {}

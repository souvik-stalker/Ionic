import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import {MyTeamsPageModule} from '../pages/my-teams/my-teams.module';
import {TeamDetailPageModule} from '../pages/team-detail/team-detail.module';
import {TournamentsPageModule} from '../pages/tournaments/tournaments.module';
import {GamePageModule} from '../pages/game/game.module';
import {TeamsPageModule} from '../pages/teams/teams.module';
import {StandingsPageModule} from '../pages/standings/standings.module';
import {TeamHomePageModule} from '../pages/team-home/team-home.module';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {EliteApi} from './shared/shared';
import { MyTeamsPage,TeamDetailPage,TournamentsPage,GamePage,TeamsPage,TeamHomePage,StandingsPage } from '../pages/pages';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    MyTeamsPageModule,
    TeamDetailPageModule,
    TournamentsPageModule,
    StandingsPageModule,
    TeamHomePageModule,
    GamePageModule,
    TeamsPageModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    TeamDetailPage,
    TournamentsPage,
    TeamsPage,
    GamePage,
    TeamHomePage,
    StandingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EliteApi,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

import { Component,ChangeDetectorRef } from '@angular/core';
import { AlertController,IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import * as _ from 'lodash';
import * as moment from 'moment';
import {EliteApi} from '../../app/shared/shared';

import {GamePage} from '../pages';
/**
 * Generated class for the TeamDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  team:any;
  games:any[];
  allGames:any[];
  dateFilter:string;
  private tourneyData:any;
  teamStanding:any;
  dateChange:boolean=false;
  isFollowing:boolean=false;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public eliteApi : EliteApi,
              public cdRef: ChangeDetectorRef,
              public alertController : AlertController,
              public toastController : ToastController) {
   
    console.log(this.team);
  }

 /* goHome(){
    this.navCtrl.parent.parent.popToRoot();
  }
  */
  ionViewDidLoad(){
    this.team=this.navParams.data;
    this.tourneyData=this.eliteApi.getCurrentTourney();

    this.games=_.chain(this.tourneyData.games)
              .filter(g=>g.team1Id===this.team.id || g.team2Id===this.team.id)
              .map(g=>{
                let isTeam1=(g.team1Id===this.team.id);
                let opponentName=isTeam1 ? g.team2:g.team1;
                let scoreDisplay =this.getScoreDisplay(isTeam1,g.team1Score,g.team2Score);
                return {
                  gameId:g.id,
                  opponent:opponentName,
                  time:Date.parse(g.time),
                  location:g.location,
                  locationUrl:g.locationUrl,
                  scoreDisplay:scoreDisplay,
                  homeAway:(isTeam1 ? "vs.": "at")
                };
              })
              .value();
    this.teamStanding=_.find(this.tourneyData.standings,{'teamId':this.team.id});  
    this.allGames=this.games;
    this.cdRef.detectChanges();        
  }

  getScoreDisplay(isTeam1,team1Score,team2Score){
    if(team1Score && team2Score){
      var teamScore=(isTeam1 ? team1Score:team2Score);
      var opponentScore=(isTeam1 ? team2Score:team1Score);
      var winIndecator=teamScore > opponentScore ? "W: ": "L: ";
      return winIndecator + teamScore + "-" + opponentScore;
    }
    else{
      return "";
    }
  }

  gameClicked($event,game){
      let sourceGame =  this.tourneyData.games.find(g=> g.id===game.gameId );
      this.navCtrl.parent.parent.push(GamePage,sourceGame);

  }

  dateChanged(){
    if(this.dateChange){
      this.games=_.filter(this.allGames,g=>moment(g.time).isSame(this.dateFilter,'day'));
    }
    else{
      this.games=this.allGames;
    }
    
  }

  getScoreWOrL(game){
   return game.scoreDisplay ? game.scoreDisplay[0]: '';
  }
  getScoreDisplayBadgeClass(game){
    return game.scoreDisplay.indexOf("W:") === 0 ? "primary" : "danger";
  }
  toggleFollow(){
      if(this.isFollowing){
        let confirm=this.alertController.create({
          title:"Unfollow ? ",
          message:"Are you sure you want to unfollow?",
          buttons:[
            {
              text:"Yes",
              handler:()=>{
                this.isFollowing=false;
                //ToDo later
                let toast=this.toastController.create({
                    message:  "You have unfollow this team.",
                    duration:2000,
                    position:'bottom'
                });

                toast.present();
              }
            },
            {
              text:"No"
            }
          ]
        });
        confirm.present();
      }
      else{
        this.isFollowing = true
      }
  }
}

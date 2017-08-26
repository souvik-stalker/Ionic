import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { TeamHomePage} from '../pages';
import {EliteApi} from '../../app/shared/shared';
/**
 * Generated class for the TeamsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  teams=[];
  /*teams=[
      {id:1,name:'HC Elite'},
      {id:2,name:'Team Takeover'},
      {id:3,name:'DC Thunder'}
  ];*/
  constructor(public navCtrl: NavController,
               public navParams: NavParams, 
               public eliteApi: EliteApi,
               public loadingController :LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsPage');
    let selectedTourney=this.navParams.data;
    let loader=this.loadingController.create({
      content:"Geting teams"
      //spinner:'dots'
    });
    loader.present().then(()=>{
      this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data=>{
        this.teams=data.teams;
        loader.dismiss();
      })
    })
   
  }
  itemTapped($event,team){
      this.navCtrl.push(TeamHomePage,team);
  }

}

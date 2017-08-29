import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EliteApi} from '../../app/shared/shared';
import * as _ from 'lodash';
/**
 * Generated class for the StandingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {

  standings:any[];
  team:any;
  allStandings:any[];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private eliteApi : EliteApi) {
  }

  ionViewDidLoad() {
    
    this.team=this.navParams.data;
    let tourneyData=this.eliteApi.getCurrentTourney();
    this.standings=tourneyData.standings;

    this.allStandings=_.chain(this.standings)
                      .groupBy('division')
                      .toPairs()
                      .map(item=>_.zipObject(['divisionName','divisionStandings'],item))
                      .value();

  }
  ionViewWillEnter(){
      console.log("ionViewWillEnter");
  }
  ionViewWillLeave(){
    console.log("ionViewWillLeave");
  }
  ionViewDidUnload(){
    console.log("ionViewDidUnload");
  }
}

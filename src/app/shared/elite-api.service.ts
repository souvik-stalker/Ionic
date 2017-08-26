import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';

import 'rxjs';
import {Observable} from 'rxjs/Observable';
@Injectable()

export class EliteApi {

    private baseURL ='https://elite-schedule-app-i2-5c71c.firebaseio.com/';
    currenttourney:any={};
    constructor(public http:Http){}

    getTournaments(){
        return new Promise(resolve=>{
                this.http.get(`${this.baseURL}/tournaments.json`)
                .subscribe(res=>resolve(res.json()));
        });
    }

    getTournamentData(tourneyId):Observable<any>{

        return this.http.get(`${this.baseURL}/tournaments-data/${tourneyId}.json`)
        .map((response:Response)=>{
            this.currenttourney=response.json();
            return this.currenttourney;
        })

    }
}
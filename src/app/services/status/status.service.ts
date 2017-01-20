import { Injectable } from '@angular/core';
import { Status } from '../../store';
import { StoreHelper } from './../store-helper';
import * as firebase from 'firebase';
import { AngularFire, AuthProviders, 
  AuthMethods,  FirebaseListObservable,
   FirebaseObjectObservable } from 'angularfire2';
import { MapsAPILoader } from 'angular2-google-maps/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import {Md5} from 'ts-md5/dist/md5';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Http} from '@angular/http';
//import { ApiService } from './api';

@Injectable()
export class StatusService {
path:any;
urlService: 'eStatus';
_uid;
_username;
isLoggedIn: any;
user: {};
_tags;
 private isloggedIn = new BehaviorSubject(false);
statusList: FirebaseListObservable<any[]>;
  constructor(
    private storeHelper: StoreHelper,
    private af: AngularFire,
    private _http: Http,
    private mapsAPILoader: MapsAPILoader
  ) {

    this.af.auth.subscribe(user => {
       if(user) {
           this._uid = user.uid;
           this._username = user.auth.displayName;
       }});
    
    this.statusList = this.af.database.list('eStatus');
  
  
  }
   


  createStatus(status: Status) {
     let sid = Md5.hashStr(new Date() + status.status + status.color + this._uid);
     this.path = this.af.database.object(`eStatus/${sid}`);
    return this.path.set({
         sid: sid,
         status: status.status,
         color: status.color,
         username: this._username,
         uid: this._uid,
         type: 'Status update',
         createdAt: firebase.database.ServerValue.TIMESTAMP,
         updatedAt: firebase.database.ServerValue.TIMESTAMP,
         tags: status.tags
      }).then((sid) => {
        //console.log(sid);
      }); 
  }
  
  getStatus() {
     return this.statusList.map(snapshot => {
         return snapshot.reverse();
     });
    
  /*  return this.apiService.get(this.path)
    .do((res: any) => this.storeHelper.update('notes', res.data));
    */
  }


}

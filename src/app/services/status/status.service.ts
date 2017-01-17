import { Injectable } from '@angular/core';
import { Status } from '../../store';
import { StoreHelper } from './../store-helper';
import * as firebase from 'firebase';
import { AngularFire, AuthProviders, 
  AuthMethods,  FirebaseListObservable,
   FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/Rx';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import {Md5} from 'ts-md5/dist/md5';
//import { ApiService } from './api';
@Injectable()
export class StatusService {
path:any;
urlService: 'eStatus';
statusList: FirebaseListObservable<any[]>;
  constructor(
    private storeHelper: StoreHelper,
    private af: AngularFire
   
  ) {
    this.statusList = this.af.database.list('eStatus');
  }
 
  createStatus(status: Status) {
     let sid = Md5.hashStr(new Date() + status.status + status.color);
     this.path = this.af.database.object(`eStatus/${sid}`);
    return this.path.set({
         sid: sid,
         status: status.status,
         color: status.color
      }).then((success) => {
        this.storeHelper.add('statuses', success)
      }); 
  }

  getStatus() {
     return this.statusList.map(snapshot => {
         return snapshot;
     });
  /*  return this.apiService.get(this.path)
    .do((res: any) => this.storeHelper.update('notes', res.data));
    */
  }
}

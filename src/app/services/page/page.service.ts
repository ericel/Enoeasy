import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire, AuthProviders, 
  AuthMethods,  FirebaseListObservable,
   FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/Rx';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class PageService {
page: FirebaseObjectObservable<any>;
  constructor(
    private af: AngularFire
  ) {  
     this.page = this.af.database.object(`/eStatus`, { preserveSnapshot: true });
     //this.page = this.af.database.list(`/eStatus`);
  }


  getPage(id: string) {
      return this.page.map(snapshot => {
        return snapshot.val()[id];   
      });
     
  }



}
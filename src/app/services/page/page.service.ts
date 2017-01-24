import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire, AuthProviders, 
  AuthMethods,  FirebaseListObservable,
   FirebaseObjectObservable } from 'angularfire2';
@Injectable()
export class PageService {
page: any;
  constructor(
    private af: AngularFire
  ) {  
     //this.page = this.af.database.object(`/eStatus`, { preserveSnapshot: true });
     this.page = this.af.database.list(`/eStatus`);
  }


  getPage(id: string) {
     return this.page.map(snapshot => {
        return snapshot.val()[id];   
      });
  }


}
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
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {Md5} from 'ts-md5/dist/md5';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Http} from '@angular/http';
import { NotificationService } from '../notification/notification.service'
//import { ApiService } from './api';

@Injectable()
export class StatusService {
path:any;
urlService: 'eStatus';
_uid;
_username;
user: {};
_tags;
projectWithUserList;
private isloggedIn = new BehaviorSubject(false);
statusList: FirebaseListObservable<any[]>;
  constructor(
    private storeHelper: StoreHelper,
    private af: AngularFire,
    private _http: Http,
    private _notify: NotificationService
  ) {

    this.af.auth.subscribe(user => {
       if(user) {
           this._uid = user.uid;
           this._username = user.auth.displayName;
       }});
    
    this.statusList = this.af.database.list('eStatus',  {
      query: {
        orderByChild: 'createdAt'
      }
    });

  }
   


createStatus(status: Status, type) {
     let sid = Md5.hashStr(new Date() + status.status + status.color + this._uid);
     this.path = this.af.database.object(`eStatus/${sid}`);
    return this.path.set({
         sid: sid,
         status: status.status,
         color: status.color,
         uid: this._uid,
         type: type,
         rating: 0,
         createdAt: firebase.database.ServerValue.TIMESTAMP,
         updatedAt: firebase.database.ServerValue.TIMESTAMP,
         tags: status.tags
       }).then(resolve => {
      }, reject => {
        this._notify.errorAttempt("Ouch! status couldn't be added!")
      })
      .catch(reject => {
        this._notify.errorAttempt("Ouch! status couldn't be added!")
      });
  }
createQuestion( question, tags, color, type ) {
     let sid = Md5.hashStr(new Date() + this._uid);
     this.path = this.af.database.object(`eStatus/${sid}`);
    return this.path.set({
         sid: sid,
         status: question,
         color: color,
         uid: this._uid,
         type: type,
         rating: 0,
         createdAt: firebase.database.ServerValue.TIMESTAMP,
         updatedAt: firebase.database.ServerValue.TIMESTAMP,
         tags: tags
      }).then(resolve => {
      }, reject => {
        this._notify.errorAttempt("Ouch! question couldn't be added!")
      })
      .catch(reject => {
        this._notify.errorAttempt("Ouch! question couldn't be added!")
      });
}

createComment( comment, sid) {
     let cid = Md5.hashStr(new Date() + this._uid + sid);
     this.path = this.af.database.object(`eComments/${cid}`);
      return this.path.set({
          sid: sid,
          comment: comment,
          uid: this._uid,
          rating: 0,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          updatedAt: firebase.database.ServerValue.TIMESTAMP,
        })
      .then(resolve => {
      }, reject => {
        this._notify.errorAttempt("Ouch! comment couldn't be added!")
      })
      .catch(reject => {
        this._notify.errorAttempt("Ouch! comment couldn't be added!")
      }); 
}
getStatus() {
  return  this.statusList
  .switchMap(statuses => {
    let userObservables = statuses.map(status => this.af.database.object(`eusers/${status.uid}`)
    );
    return Observable.combineLatest(...userObservables)
      .map((...eusers) => {
        statuses.forEach((status, index) => {
          status.username = eusers[0][index].name;
          status.avatar = eusers[0][index].avatar;
        });
        return statuses.reverse();          
      });
  });

  }

  getComments(sid) {
  const commentList = this.af.database.list('/eComments', {
      query: {
        orderByChild: 'sid',
        equalTo: sid
      }
    });
    
   return  commentList
  .switchMap(comments => {
    let userObservables = comments.map(status => this.af.database.object(`eusers/${status.uid}`)
    );
    return Observable.combineLatest(...userObservables)
      .map((...eusers) => {
        comments.forEach((comment, index) => {
          comment.username = eusers[0][index].name;
          comment.avatar = eusers[0][index].avatar;
        });
        return comments;          
      });
  });

  }

  rateStatus(status: Status) {
    this.path = this.af.database.object(`eStatus/${status.sid}`);
    let rStatusUser = this.af.database.object(`eRatingUsers/${status.sid}`);
    rStatusUser.subscribe(value => {
      if(value.uid === this._uid){
        this._notify.failedAttempt("You already voted this thread!");
      } else {
         return rStatusUser.set({
          uid: this._uid
        }) 
        .then(_ =>  this.path.update({ rating: status.rating + 1 }))
        .catch(err => this._notify.failedAttempt("Ouch! Something bad has happened!")); 
      }
     
    });
     
  }


}

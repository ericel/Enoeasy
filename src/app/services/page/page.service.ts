import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire, AuthProviders, 
  AuthMethods,  FirebaseListObservable,
   FirebaseObjectObservable } from 'angularfire2';
   import { Router } from '@angular/router';
import 'rxjs/Rx';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Md5} from 'ts-md5/dist/md5';
import { NotificationService } from '../notification/notification.service'
@Injectable()
export class PageService {
page: FirebaseObjectObservable<any>;
_uid;_username;pid;
CREATE_KEY: string = 'blog_create_token';
token;blogPath;pageBlg;
  constructor(
    private af: AngularFire,
    private _notify: NotificationService,
    private router: Router,
  ) {  
     this.page = this.af.database.object(`/eStatus`, { preserveSnapshot: true });
     this.pageBlg = this.af.database.object(`/eblogs`, { preserveSnapshot: true });
     //this.page = this.af.database.list(`/eStatus`);
     this.af.auth.subscribe(user => {
       if(user) {
           this._uid = user.uid;
           this._username = user.auth.displayName;
       }});

       this.token = window.localStorage.getItem(this.CREATE_KEY);
      if(this.token){
        this.blogPath = this.af.database.object(`eblogs/${this.token}`);
      }

  }


  getPage(id: string) {
      return this.page.map(snapshot => {
        if(!snapshot.val()){
           this.router.navigate(['/NotFound404']);
        }
        return snapshot.val()[id];   
      }) 
  }

getPageBlg(id: string){
   return this.pageBlg.map(snapshot => {
        return snapshot.val()[id];   
    });
}
  createBlog(blogcat, blogtitle){
    const token = window.localStorage.getItem(this.CREATE_KEY);
      if(token) {
         return;
      } else {
          this.pid = Md5.hashStr(new Date() + this._uid);
          let path = this.af.database.object(`eblogs/${this.pid}`);
          path.set({
              pid: this.pid,
              blogCat: blogcat,
              uid: this._uid,
              status: 'draft',
              createdAt: firebase.database.ServerValue.TIMESTAMP,
              updatedAt: firebase.database.ServerValue.TIMESTAMP,
              blogTitle: blogtitle
            }).then(resolve => {
              window.localStorage.setItem(this.CREATE_KEY, this.pid);
              this._notify.successAttempt("Way to go! You're on your way to creating an awesome blog!");
            }, reject => {
              this._notify.errorAttempt("Ouch! something is wrong!")
            })
            .catch(reject => {
              this._notify.errorAttempt("Ouch! something is wrong!")
            });
        }
  }
 

 updateBlogDesc(blogDesc){
   const token = window.localStorage.getItem(this.CREATE_KEY);
   let path = this.af.database.object(`eblogs/${token}`);
   if(token){
   path.update({
         blogDesc: blogDesc
       }).then(resolve => {
        this._notify.successAttempt("Draft Saved!")
      }, reject => {
        this._notify.errorAttempt("Ouch! something is wrong!")
      })
      .catch(reject => {
        this._notify.errorAttempt("Ouch! something is wrong!")
    });
   }  
 }

 updateBlogFull(blogFull) {
   const token = window.localStorage.getItem(this.CREATE_KEY);
    let path = this.af.database.object(`eblogs/${token}`);
   if(token){
   path.update({
         blog: blogFull
       }).then(resolve => {
        this._notify.successAttempt("Draft Saved!")
      }, reject => {
        this._notify.errorAttempt("Ouch! something is wrong!")
      })
      .catch(reject => {
        this._notify.errorAttempt("Ouch! something is wrong!")
    });
   }  
 }

publishBlog(blog, photoUrl) {
  const token = window.localStorage.getItem(this.CREATE_KEY);
   let path = this.af.database.object(`eblogs/${token}`);
   if(token){
  return path.update({
         blogCat: blog.blogCat,
         blogDesc: blog.blogDesc,
         status: 'Published',
         blogTitle: blog.blogTitle,
         photoUrl: photoUrl
       }).then(resolve => {
        this.updateStatus(blog.blogCat, blog.blogDesc, photoUrl);
        this._notify.successAttempt("Nicely Done! Blog was successfully phublished!")
      }, reject => {
        this._notify.errorAttempt("Ouch! something is wrong!")
      })
      .catch(reject => {
        this._notify.errorAttempt("Ouch! something is wrong!")
    });
   }  

 }

updateBlogPhoto(url) {
  const token = window.localStorage.getItem(this.CREATE_KEY);
   let path = this.af.database.object(`eblogs/${token}`);
   if(token){
  return path.update({
         blogPhotoUrl: url
       }).then(resolve => {
        this._notify.successAttempt("Photo successfully uploaded!")
      }, reject => {
        this._notify.errorAttempt("Ouch! something is wrong!")
      })
      .catch(reject => {
        this._notify.errorAttempt("Ouch! something is wrong!")
    });
   }  
}

updateStatus(type, status, photoUrl){
    const token = window.localStorage.getItem(this.CREATE_KEY);
    let path = this.af.database.object(`eStatus/${token}`);
    return path.set({
         sid: token,
         status: status,
         color: "#fff",
         uid: this._uid,
         type: type,
         rating: 0,
         photoUrl: photoUrl,
         createdAt: firebase.database.ServerValue.TIMESTAMP,
         updatedAt: firebase.database.ServerValue.TIMESTAMP,
         tags: "blog"
    });
}

}
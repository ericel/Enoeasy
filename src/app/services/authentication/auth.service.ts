import {Location} from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from './../../store';
import { StoreHelper } from './../store-helper';
import { ApiService } from './../api/api.service';
import { EasyapiService } from './../easyapi/easyapi.service';
import { Observable } from 'rxjs/Observable';
import { AngularFire, AuthProviders, AuthMethods,  FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';
@Injectable()
export class AuthService implements CanActivate {
  LOGIN_KEY: string = 'access_token';
  UID_KEY: string = '';
  userAuth: any;
  api_url: FirebaseObjectObservable<any>;
  path: string = 'users';
  user: {};
  users: any;
  constructor(
    private router: Router,
    private store: Store,
    private storeHelper: StoreHelper,
    private api: ApiService,
    private easyApi: EasyapiService,
    private af: AngularFire,
    private _location: Location
    ) {
   
    this.userAuth = this.af.auth.map(auth => {
       if(auth) {
           return auth;
       } else {
           return false;
       }});
    this.users = this.af.database.object(`/users`, { preserveSnapshot: true });
    }
  login(provider: string) {
    this.af.auth.login({
      provider: this._getProvider(provider)
    }).then(
        (success) => {
        this.authenticate(success);
   })
  }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.af.auth.map((auth) =>  {
      if(auth == null) {  
        this.router.navigate(['/signup']);
        return false;
      } else {
        return true;
      }
    }).first()
  }

  authenticate(user: any): any {
     if(!user) {
      return {};
    }
    let data = user.auth.providerData[0];
    this.api_url = this.af.database.object(`${this.path}/${user.auth.uid}`);  
    return this.api_url.set({
          name: data.displayName,
          avatar: data.photoURL,
          email: data.email,
          provider: data.providerId,
          uid: user.auth.uid
      }).then((success) => {
         this._location.back(); 
      }); 
  }
 
 userById(id: string){
  return this.users.map(snapshot => {
      return snapshot.val()[id];   
    });
 }


  logout() {
    this.af.auth.logout();
    this.store.purge();
  }

   private _getProvider(from: string) {
    switch(from){
      case 'twitter': return AuthProviders.Twitter;
      case 'facebook': return AuthProviders.Facebook;
      case 'github': return AuthProviders.Github;
      case 'google': return AuthProviders.Google;
    }
  }
}

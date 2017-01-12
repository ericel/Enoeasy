import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from './../../store';
import { StoreHelper } from './../store-helper';
import { ApiService } from './../api/api.service';
import { Observable } from 'rxjs/Observable';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
@Injectable()
export class AuthService implements CanActivate {
  JWT_KEY: string = 'auth_token';
  JWT: string = '';
  userAuth: Observable<any>;
  user: {};
  path: string = 'users';
  constructor(
    private router: Router,
    private store: Store,
    private storeHelper: StoreHelper,
    private api: ApiService,
    private af: AngularFire
    ) { 
      this.userAuth = this.af.auth.map(
        user => this._changeState(user),
        error => console.trace(error),
      );
      const token = window.localStorage.getItem(this.JWT_KEY);
      if(token){
        this.setJwt(token);
      }
    }
  login(provider: string) {
    this.af.auth.login({
      provider: this._getProvider(provider)
    }).then(
        (success) => {
        let data = success.auth.providerData[0];
        this.user = {
          name: data.displayName,
          avatar: data.photoURL,
          email: data.email,
          provider: data.providerId,
          uid: success.auth.uid
        }
        this.authenticate(this.path, this.user).subscribe(() => this.router.navigate(['']));
      })
  }
  _changeState(user: any = null) {
    if(user) {
      return {
        user: this._getUserInfo(user),
      }
      
    }
    else {
      return {
        user: null,
      }
    }
  }

 _getUserInfo(user: any): any {
    if(!user) {
      return {};
    }
    let data = user.auth.providerData[0];
    return {
      name: data.displayName,
      avatar: data.photoURL,
      email: data.email,
      provider: data.providerId,
      uid: user.auth.uid
    };
  }

  setJwt(jwt: string){
    window.localStorage.setItem(this.JWT_KEY, jwt);
    this.api.setHeaders({Authorization: `Bearer ${jwt}`})
  }
  isAuthorized(): boolean {
    return Boolean(this.JWT);
  }

  canActivate(): boolean {
    const canActivate = this.isAuthorized();
    this.onCanActivate(canActivate);
    return canActivate;
  }

  onCanActivate( canActivate: boolean) {
    if(!canActivate){
      this.router.navigate(['', 'signup']);
    }
  }

  authenticate(path, credits): Observable<any> {
    return this.api.post(`${path}/${'kk'}`, credits)
      .do((res: any) => this.setJwt(res.token))
      .do((res: any) => this.storeHelper.update('user', res.data))
      .map((res: any) => res.data);
  }
 
  signout() {
    this.af.auth.logout()
    window.localStorage.removeItem(this.JWT_KEY);
    this.api.setHeaders({Authorization: ``});
    this.store.purge();
    //this.router.navigate(['']);
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

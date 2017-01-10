import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from './../../store';
import { StoreHelper } from './../store-helper';
import { ApiService } from './../api/api.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AuthService implements CanActivate {
  JWT_KEY: string = 'auth_token';
  JWT: string = 'ssss';

  constructor(
    private router: Router,
    private store: Store,
    private storeHelper: StoreHelper,
    private api: ApiService
    ) { 
      const token = window.localStorage.getItem(this.JWT_KEY);
      if(token){
        this.setJwt(token);
      }
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
    return this.api.post(`/${path}`, credits)
      .do((res: any) => this.setJwt(res.token))
      .do((res: any) => this.storeHelper.update('user', res.data))
      .map((res: any) => res.data);
  }
 
  signout() {
    window.localStorage.removeItem(this.JWT_KEY);
    this.store.purge();
    this.router.navigate(['', 'home']);
  }
}

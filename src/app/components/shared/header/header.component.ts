import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
showStyle: false;
isAuthorized: boolean = false;
searchThis;
user;
  constructor(
    private _elementRef: ElementRef,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._authService.userAuth
    .subscribe(value => { 
    if(value){this.isAuthorized = true; this.user = value; console.log(this.user)} 
     else {this.isAuthorized = false} });
  }
 
 focusChange(){
  if(this.showStyle) {
      return "#8ac53e";
    } else {
      return "red";
    }
 }

  reset() {
    this.searchThis = " ";
  }

  logout(){
    this._authService.logout();
  }
}

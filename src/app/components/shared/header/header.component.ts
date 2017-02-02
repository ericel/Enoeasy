import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

isAuthorized: boolean = false;
 showStyle: false;
  searchThis;
  route: string;
  cat: string;
user; 
  constructor(
    private _elementRef: ElementRef,
    private _authService: AuthService,
    private router: Router,
    private location: Location
  ) {
     this.router.events.subscribe(event => {
       //console.log(location.path());
         if(location.path() != ''){
            this.route = location.path();
            if(this.route === '/add' || this.route === '/add/blog'){
              this.cat = "ADD"
            } else {
              this.cat = "HOME"
            }
          } else {
            this.route = 'Home'
            this.cat = "HOME"
          }
       });
   }

  ngOnInit() {
    this._authService.userAuth
    .subscribe(value => { 
    if(value){this.isAuthorized = true; this.user = value} 
     else {this.isAuthorized = false} });
  }
 
focusChange(){
  if(this.showStyle) {
      return "#8ac53e";
    } else {
      return "#D32F2F";
    }
 }

  reset() {
    this.searchThis = " ";
  }

  logout(){
    this._authService.logout();
  }
}
